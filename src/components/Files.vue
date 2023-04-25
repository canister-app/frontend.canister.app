<script>
  import { Principal } from "@dfinity/principal"
  import { useRoute } from 'vue-router'
  import { ref, watch } from 'vue'
  import  * as FileManager from '../IC/api.js'
  import config from "../config";
  import { VueFinalModal } from 'vue-final-modal'
  import moment from 'moment';
  import { genPreviewTag, checkIsValidDomain } from "../IC/utils";
  import { useToast } from "vue-toastification";
  import { walletData } from "../services/store"
  import LoginModal from "./modals/LoginModal.vue"
  import EventBus from "../services/EventBus";
  const MAX_CHUNK_SIZE = 1024 * 1024 * 1.5; // 1.5MB
  const userId = Principal.fromText("2vxsx-fae");//Need authen
  const encodeArrayBuffer = (file) => Array.from(new Uint8Array(file));

  export default {
      components: { VueFinalModal, LoginModal },
      data() {
          return {
              walletData,
              loginModal: false,
              showUploadModal: false,
              isUploadFolder: true,
              showUploadFilesModal: false,
              showCreateFolderModal: false,
              selectedFolder: null,
              files: [],
              uploadFiles: [],
              uploadFilesStatus: [],
              isUploading: false,
              navPaths: [],
              currentPath: "/",
              newFolderName: "",
              isLoadingFiles: false,
              previewModal: false,
              showModalSetting: false,
              customDomain: '',
              isPublic: false
          }
      },
      methods: {
          async init(){
              this.customDomain = '';
              this.isPublic = false;
              let _setting = await FileManager.getSetting();
              try{
                  this.customDomain = _setting[0].domain;
                  this.isPublic = _setting[0].isPublic;
              }catch (e) {
                  //No configuration
              }

          },
          async btnUpdateSetting() {
              let _currentSetting = {
                  isPublic: JSON.parse(JSON.stringify(this.isPublic)),
                  customDomain: JSON.parse(JSON.stringify(this.customDomain))
              }
              let validDomain = checkIsValidDomain(this.customDomain);
              if(!validDomain) this.toast.error("Invalid domain name, accepted only letter and number!")
              const toastSetting = this.toast("Saving settings...");
              this.showModalSetting = false;
              let _setting = await FileManager.updateSetting(this.customDomain, this.isPublic);
              if(_setting){
                  this.toast.success("Setting saved!", { id: toastSetting})
              }else{
                  //restore setting value
                  this.isPublic = _currentSetting.isPublic;
                  this.customDomain = _currentSetting.customDomain;
                  this.toast.error("Save failed, please try again later!", { id: toastSetting})
              }
          },
          btnShowSetting() {
              this.showModalSetting = true;
          },
          btnPreview(file){
            this.previewModal = true;
              this.previewContent = {};
            this.previewContent = {
                fileInfo: file,
                content: genPreviewTag(file.fileId)
            };
          },
          btnShowUpload(type) {
              this.isUploadFolder = type;
              this.showUploadModal = true;
              this.uploadFiles = [];
              this.uploadFilesStatus = [];
          },
          btnCreateFolder() {
              this.showCreateFolderModal = true;
              this.newFolderName = "";
          },
          async prepairUpload(e){
              if(this.uploadFiles.length > 0){
                  this.uploadFiles = this.uploadFiles.concat(Array.from(e.target.files));//Push file to existed array
              }else{
                  this.uploadFiles =  Array.from(e.target.files);
              }
          },
          async uploadFolder() {
              this.isUploading = true;
              this.uploadFilesStatus = [];
              for (let [idx, file] of this.uploadFiles.entries()) {
                  if(file.size < 1000000){//Less than 1MB
                      const fileInit = await this.getFileInit(file);
                      this.uploadFilesStatus[idx] = 1;
                      const [fileId] = await FileManager.createFile(fileInit);
                      let chunk = 1;
                      for (
                          let byteStart = 0;
                          byteStart < file.size;
                          byteStart += MAX_CHUNK_SIZE, chunk += 1
                      ) {
                          let fileSlice = file.slice(byteStart, Math.min(file.size, byteStart + MAX_CHUNK_SIZE), file.type);
                          let fileSliceBuffer = (await fileSlice.arrayBuffer()) || new ArrayBuffer(0);
                          let sliceToNat = encodeArrayBuffer(fileSliceBuffer);
                          await FileManager.putFileChunk(fileId, chunk, sliceToNat);
                      }
                      this.uploadFilesStatus[idx] = 2;
                  }

              }
              this.toast.success(this.uploadFiles.length + " file(s) uploaded successfully!");
              this.isUploading = false;
              this.getFolder();
          },
          selectFolder(path){
              let _path = path.replace(/\/\/+/g, '/');
              this.currentPath = _path;
              this.getFolder();
              this.genBreakcum(_path);
          },
          generatePath(path, trim){
              let _path = path.replace(/\/\/+/g, '/');
              if(trim) _path = _path.replace(/^\/[^/]+/, "");
            return _path;
          },
          generateFilePath(path){
              let _path = path.replace(/\/\/+/g, '/');
              if( _path.charAt( 0 ) === '/' )
                  _path = _path.slice(1);
            return _path;
          },
          addPricipalFolder(path){
              return ("/"+walletData.txtPrincipal+"/"+path).replace(/\/\/+/g, '/');
          },
          updateFolderName(){

          },
          async deleteAsset(file){
              let _msg = file.isFolder? "folder with subfolders and files?":"file?";
              window.Swal.fire({
                  icon: 'question',
                  text: 'Are you sure you want to delete this '+ _msg,
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
              }).then(async (result) => {
                  if (result.isConfirmed) {
                      let _path = file.fileId;
                      if(file.isFolder){
                          _path = this.addPricipalFolder(file.fileId);
                      }
                      const toastId = this.toast("Deleting "+file.isFolder?' folder `'+file.name+'` with subfolders and files':' file'+"`"+file.name+"`");
                      let result = await FileManager.deleteAsset(_path);
                      this.toast.success(file.isFolder?'Folder: ':'File: ' +this.name+"` has been deleted!", {id: toastId});
                      this.getFolder();
                  }
              })

          },
          async createFolder(){
              const toastId = this.toast("Creating folder: `"+this.newFolderName+"`");
              let _path = this.addPricipalFolder(this.currentPath + this.newFolderName);
              try{
                  this.showCreateFolderModal = false;
                  let result = await FileManager.createFolder(_path);
                  this.toast.success('Folder: `'+this.newFolderName+"` created!", {id: toastId});
                  this.selectFolder(this.currentPath);
                  this.newFolderName = "";
              }catch (e) {
                  this.toast.error("Not authorized!", {id: toastId});
              }

          },
          async getFolder(directPath){
              this.isLoadingFiles = true;
              this.files = [];
              let _fullPath = this.addPricipalFolder(directPath?directPath:this.currentPath);
              this.genBreakcum(this.currentPath);
              try{
                  const folder = await FileManager.getFolder(_fullPath);//_api.canister(config.CANIC_APP).getFolder(_fullPath);
                  let _files = folder[0].sort((a,b) => b.isFolder - a.isFolder);

                  this.files = _files.map(file => {
                      return {
                          chunkCount: file.chunkCount,
                          createdAt: moment(Number(file.createdAt)/1000000).format('MM/DD/YYYY, h:mm:ss a'),
                          fileId: this.generatePath(file.fileId, file.isFolder),
                          fileSize: file.fileSize>0?Number(file.fileSize)/1000+' KB':'',
                          isFolder: file.isFolder,
                          mimeType: file.mimeType,
                          name: file.name,
                          parent: file.parent
                      }
                  });
                  this.selectedFolder = this.files;
                  this.isLoadingFiles = false;
              }catch (e) {
                  this.toast.error("Not authorized!");
                  this.isLoadingFiles = false;
              }

          },

          genBreakcum(paths){
              let _paths = paths.split("/");
              this.navPaths = [];
              let _rootPath = "/";
              _paths.forEach( path => {
                  if(path != ""){
                      _rootPath = _rootPath+path+'/';
                      this.navPaths.push({name: path, path: _rootPath })
                  }
              })
          },
          async getFileInit(file) {
              const chunkCount = Number(Math.ceil(file.size / MAX_CHUNK_SIZE));
              let _currentPath = this.currentPath+(this.isUploadFolder?file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf("/"))+'/':'');
              return {
                  chunkCount,
                  fileSize: file.size,
                  name: file.name,
                  path: this.generateFilePath(_currentPath+file.name),
                  mimeType: file.type,
                  parent: this.addPricipalFolder(_currentPath)

              };
          }
      },
      watch: {
          $route(to, from){
              this.currentPath = to.path;
              this.getFolder();
          },
          'walletData.isModalVisible'(val){
              this.loginModal= val;
          },
          'walletData.isLogged'(val){
              this.files = [];//reset before
              setTimeout(()=>{
                  this.getFolder();
                  this.init();
              }, 2000)
          },
          loginModal: (val, oldVal)=>{
              walletData.setModalVisible(val);
          }
      },
      mounted() {
          if(this.$route.params.folder.length > 0){
              this.currentPath = this.$route.params.folder.join("/")+"/";
          }
          setTimeout(()=>{
              this.getFolder();
          }, 2000)

          setTimeout(()=>{
              this.init();
          }, 3000)

          EventBus.on("showModalSetting", isOpen => {
              this.showModalSetting = isOpen;
          });
      },
      setup() {
          // Get toast interface
          const toast = useToast();
          // Make it available inside methods
          return { toast }
      }
  }
  const isImage = (mimeType) => {
      let flag = false;
      if (mimeType.indexOf('image') !== -1) {
          flag = true;
      }
      return (flag);
  };



</script>
<template>
    <div class="nk-fmg-aside" data-content="files-aside" data-toggle-overlay="true" data-toggle-body="true" data-toggle-screen="lg" data-simplebar>
        <div class="nk-fmg-aside-wrap">
            <div class="nk-fmg-aside-top" data-simplebar>
                <ul class="nk-fmg-menu">
                    <li class="active">
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-home-alt"></em>
                            <span class="nk-fmg-menu-text">Home</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-file-docs"></em>
                            <span class="nk-fmg-menu-text">Files</span>
                        </a>
                        <ul>
                            <li><a href="#" class="nk-fmg-menu-item"><span class="nk-fmg-menu-text">New Files</span></a></li>
                            <li><a href="#" class="nk-fmg-menu-item"><span class="nk-fmg-menu-text">This Months</span></a></li>
                            <li><a href="#" class="nk-fmg-menu-item"><span class="nk-fmg-menu-text">Older Files</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-star"></em>
                            <span class="nk-fmg-menu-text">Starred</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-share-alt"></em>
                            <span class="nk-fmg-menu-text">Shared</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="#">
                            <em class="icon ni ni-trash-alt"></em>
                            <span class="nk-fmg-menu-text">Recovery</span>
                        </a>
                    </li>
                    <li>
                        <a class="nk-fmg-menu-item" href="javascript:void(0)" @click="btnShowSetting">
                            <em class="icon ni ni-setting-alt"></em>
                            <span class="nk-fmg-menu-text">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="nk-fmg-aside-bottom">
                <div class="nk-fmg-status">
                    <h6 class="nk-fmg-status-title"><em class="icon ni ni-hard-drive"></em><span>Canister Storage</span></h6>
                    <div class="progress progress-md bg-light">
                        <div class="progress-bar" data-progress="5"></div>
                    </div>
                    <div class="nk-fmg-status-info">0.47 GB of 4 GB used</div>
                    <div class="nk-fmg-status-action">
                        <a href="#" class="link link-primary link-sm">Create New Bucket</a>
                    </div>
                </div>
<!--                <div class="nk-fmg-switch">-->
<!--                    <div class="dropup">-->
<!--                        <a href="#" data-bs-toggle="dropdown" data-offset="-10, 12" class="dropdown-toggle dropdown-indicator-unfold">-->
<!--                            <div class="lead-text">Personal</div>-->
<!--                            <div class="sub-text">Only you</div>-->
<!--                        </a>-->
<!--                        <div class="dropdown-menu dropdown-menu-end">-->
<!--                            <ul class="link-list-opt no-bdr">-->
<!--                                <li><a href="#"><span>Team Plan</span></a></li>-->
<!--                                <li><a class="active" href="#"><span>Personal</span></a></li>-->
<!--                                <li class="divider"></li>-->
<!--                                <li><a class="link" href="#"><span>Upgrade Plan</span></a></li>-->
<!--                            </ul>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>


    </div><!-- .nk-fmg-aside -->
    <div class="nk-fmg-body">
        <div class="nk-fmg-body-head d-lg-flex">
            <nav>
                <ul class="breadcrumb breadcrumb-arrow">
                    <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                    <li class="breadcrumb-item active" v-for="nav in navPaths"><router-link :to="nav.path">{{nav.name}}</router-link></li>
                </ul>
            </nav>
            <div class="nk-fmg-actions">
                <ul class="nk-block-tools g-3">
                    <li>
                    <a href="javascript:void(0)" @click="getFolder()" class="btn btn-light d-none "><em class="icon ni ni-repeat"></em> <span>Refresh</span></a></li>
                    <li>
                    <a href="javascript:void(0)" @click="btnCreateFolder()" class="btn btn-light"><em class="icon ni ni-folder-plus"></em> <span>Folder</span></a></li>

                    <li>
                        <div class="dropdown">
                            <a href="#" class="btn btn-primary" data-bs-toggle="dropdown"><em class="icon ni ni-upload-cloud"></em> <span>Upload</span></a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <ul class="link-list-opt no-bdr">
                                    <li><a href="javascript:void(0)" @click="btnShowUpload(false)"><em class="icon ni ni-file-plus"></em><span>Upload Files</span></a></li>
                                    <li><a href="javascript:void(0);" @click="btnShowUpload(true)"><em class="icon ni ni-folders"></em><span>Upload Folder</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="nk-fmg-body-content">
        <div class="nk-fmg-listing nk-block-lg">
            <div class="tab-content">
                <div class="tab-pane active" id="file-list-view">

                    <div class="nk-files nk-files-view-list">
                        <div class="nk-files-head">
                            <div class="nk-file-item">
                                <div class="nk-file-info">
                                    <div class="tb-head dropdown-toggle dropdown-indicator-caret" data-bs-toggle="dropdown">Name</div>
                                    <div class="dropdown-menu dropdown-menu-xs">
                                        <ul class="link-list-opt no-bdr">
                                            <li class="opt-head"><span>ORDER BY</span></li>
                                            <li><a href="#"><span>Descending</span></a></li>
                                            <li><a href="#"><span>Ascending</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="tb-head"></div>
                                </div>
                                <div class="nk-file-meta">
                                    <div class="dropdown">
                                        <div class="tb-head dropdown-toggle dropdown-indicator-down" data-bs-toggle="dropdown">Created</div>
                                        <div class="dropdown-menu dropdown-menu-xs">
                                            <ul class="link-list-opt ui-colored no-bdr">
                                                <li class="opt-head"><span>ORDER BY</span></li>
                                                <li><a class="active" href="#"><span>Descending</span></a></li>
                                                <li><a href="#"><span>Ascending</span></a></li>
                                                <li class="divider"></li>
                                                <li class="opt-head"><span>SHOW</span></li>
                                                <li><a class="active" href="#"><span>Last Opened</span></a></li>
                                                <li><a href="#"><span>Name</span></a></li>
                                                <li><a href="#"><span>Size</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-file-members">
                                    <div class="tb-head">Type</div>
                                </div>
                                <div class="nk-file-actions">
                                    <div class="dropdown">
                                        <a href="" class="dropdown-toggle btn btn-sm btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <ul class="link-list-opt no-bdr">
                                                <li><a href="#file-share" data-bs-toggle="modal"><em class="icon ni ni-share"></em><span>Share</span></a></li>
                                                <li><a href="#file-copy" data-bs-toggle="modal"><em class="icon ni ni-copy"></em><span>Copy</span></a></li>
                                                <li><a href="#file-move" data-bs-toggle="modal"><em class="icon ni ni-forward-arrow"></em><span>Move</span></a></li>
                                                <li><a href="#" class="file-dl-toast"><em class="icon ni ni-download"></em><span>Download</span></a></li>
                                                <li><a href="#"><em class="icon ni ni-trash"></em><span>Delete</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- .nk-files-head -->
                        <div class="nk-files-list">
                            <div class="nk-file-item nk-file" v-for="(file, idx) in files" v-bind:key="idx">
                                <div class="nk-file-info">
                                    <div class="nk-file-title">
                                        <div class="custom-control custom-control-sm custom-checkbox notext">
                                            <input type="checkbox" class="custom-control-input" id="file-check-n1">
                                            <label class="custom-control-label" for="file-check-n1"></label>
                                        </div>
                                        <div class="nk-file-icon" v-if="file.isFolder">
                                                                                <span class="nk-file-icon-type">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                                                                                        <g>
                                                                                            <rect x="32" y="16" width="28" height="15" rx="2.5" ry="2.5" style="fill:#f29611" />
                                                                                            <path d="M59.7778,61H12.2222A6.4215,6.4215,0,0,1,6,54.3962V17.6038A6.4215,6.4215,0,0,1,12.2222,11H30.6977a4.6714,4.6714,0,0,1,4.1128,2.5644L38,24H59.7778A5.91,5.91,0,0,1,66,30V54.3962A6.4215,6.4215,0,0,1,59.7778,61Z" style="fill:#ffb32c" />
                                                                                            <path d="M8.015,59c2.169,2.3827,4.6976,2.0161,6.195,2H58.7806a6.2768,6.2768,0,0,0,5.2061-2Z" style="fill:#f2a222" />
                                                                                        </g>
                                                                                    </svg>
                                                                                </span>
                                        </div>
                                        <div class="nk-file-icon" v-else>
                                                                                <span class="nk-file-icon-type">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                                                                                        <g>
                                                                                            <path d="M49,61H23a5.0147,5.0147,0,0,1-5-5V16a5.0147,5.0147,0,0,1,5-5H40.9091L54,22.1111V56A5.0147,5.0147,0,0,1,49,61Z" style="fill:#e3edfc" />
                                                                                            <path d="M54,22.1111H44.1818a3.3034,3.3034,0,0,1-3.2727-3.3333V11s1.8409.2083,6.9545,4.5833C52.8409,20.0972,54,22.1111,54,22.1111Z" style="fill:#b7d0ea" />
                                                                                            <path d="M19.03,59A4.9835,4.9835,0,0,0,23,61H49a4.9835,4.9835,0,0,0,3.97-2Z" style="fill:#c4dbf2" />
                                                                                            <rect x="27" y="31" width="18" height="2" rx="1" ry="1" style="fill:#599def" />
                                                                                            <rect x="27" y="36" width="18" height="2" rx="1" ry="1" style="fill:#599def" />
                                                                                            <rect x="27" y="41" width="18" height="2" rx="1" ry="1" style="fill:#599def" />
                                                                                            <rect x="27" y="46" width="12" height="2" rx="1" ry="1" style="fill:#599def" />
                                                                                        </g>
                                                                                    </svg>
                                                                                </span>
                                        </div>

                                        <div class="nk-file-name">
                                            <div class="nk-file-name-text">
                                                <router-link :to="file.fileId" class="title" @click="selectFolder(file.fileId)" v-if="file.isFolder">{{file.name}}</router-link>
                                                <a href="javascript:void(0)" class="title" @click="btnPreview(file)" v-if="!file.isFolder">{{file.name}}</a>
<!--                                                <div class="nk-file-star asterisk"><a href="#"><em class="asterisk-off icon ni ni-star"></em><em class="asterisk-on icon ni ni-star-fill"></em></a></div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nk-file-meta">
                                    <div class="tb-lead">{{file.createdAt}}</div>
                                </div>
                                <div class="nk-file-meta">
                                    <div class="tb-lead">{{file.fileSize}}</div>
                                    <div class="tb-sub">{{file.mimeType}}</div>
                                </div>
                                <div class="nk-file-actions">
                                    <div class="dropdown">
                                        <a href="" class="dropdown-toggle btn btn-sm btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <ul class="link-list-plain no-bdr">
                                                <li><a href="#file-details" data-bs-toggle="modal"><em class="icon ni ni-eye"></em><span>Details</span></a></li>
                                                <li><a href="#file-share" data-bs-toggle="modal"><em class="icon ni ni-share"></em><span>Share</span></a></li>
                                                <li><a href="#file-copy" data-bs-toggle="modal"><em class="icon ni ni-copy"></em><span>Copy</span></a></li>
                                                <li><a href="#file-move" data-bs-toggle="modal"><em class="icon ni ni-forward-arrow"></em><span>Move</span></a></li>
                                                <li><a href="#" class="file-dl-toast"><em class="icon ni ni-download"></em><span>Download</span></a></li>
                                                <li><a href="#"><em class="icon ni ni-pen"></em><span>Rename</span></a></li>
                                                <li><a href="javascript:void(0)" @click="deleteAsset(file)"><em class="icon ni ni-trash"></em><span>Delete</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- .nk-file -->
                        </div>
                    </div><!-- .nk-files -->
                    <div class="files-loading" v-if="files.length==0 && isLoadingFiles">
                        <div v-if="isLoadingFiles == true">
                            <em class="icon-upload fa fa-spinner fa-spin"></em> Loading...
                        </div>
                        <div class="empty-icon" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
                                <rect x="5" y="10" width="70" height="60" rx="7" ry="7" fill="#cccccc" stroke="#cccccc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></rect>
                                <rect x="15" y="20" width="70" height="60" rx="7" ry="7" fill="#fff" stroke="#cccccc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></rect>
                                <path d="M47.4,52.58S37.23,62.76,31.63,56.16c-4.88-5.76-5.13-11.09-1.41-14.81s11.53-3.87,15.92,1.19,10,10.79,12.49,12.35,11.83,2.75,13.62-5.36-5.13-9.3-7.59-9.67c-.69-.1-2.27,1-4.39,2.29C54.93,45.42,47.4,52.58,47.4,52.58Z" fill="#cccccc" fill-rule="evenodd"></path>
                                <path d="M44.66,41.42a11,11,0,0,0-4.81-2.78,10.12,10.12,0,1,0,0,19.72,11,11,0,0,0,4.81-2.78q1.58-1.45,3.1-2.94l-.2-.19c-1,1-2.05,2-3.08,2.93a10.65,10.65,0,0,1-4.7,2.71,9.84,9.84,0,1,1,0-19.18,10.65,10.65,0,0,1,4.7,2.71c4.52,4.22,8.85,8.64,13.38,12.86A9.48,9.48,0,0,0,62,56.89a8.61,8.61,0,1,0,0-16.78,9.48,9.48,0,0,0-4.11,2.41c-1,.95-2,1.91-3,2.88l.2.19,3-2.87a9.3,9.3,0,0,1,4-2.34,8.34,8.34,0,1,1,0,16.24,9.3,9.3,0,0,1-4-2.34c-4.52-4.22-8.85-8.65-13.38-12.86Z" fill="#ffffff" stroke="#cccccc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill-rule="evenodd"></path>
                            </svg>
                            <small>EMPTY</small>
                        </div>
                    </div>

                </div><!-- .tab-pane -->
            </div><!-- .tab-content -->
        </div><!-- .nk-block -->

        <div class="alert alert-fill alert-warning alert-icon" v-if="isPublic">
            <em class="icon ni ni-alert-circle"></em> Your drive are being published on domain <strong><a :href="`https://${customDomain}.canic.app`" target="_blank">{{customDomain}}.canic.app</a></strong>.
            Anyone can access these files if there is a link. You can change the settings <a href="javascript:void(0)" @click="btnShowSetting" class="alert-link">here</a>.
        </div>
            <VueFinalModal v-model="previewModal" classes="vue-modal-container" content-class="vue-modal-content">
                <button class="menu-toggler active icon-close modal__close" @click="previewModal = false"><em class="menu-off menu-icon ni ni-cross"></em></button>
                <h5 class="title mb-3" v-if="previewContent">
                    Preview: {{previewContent.fileInfo.name}}
                </h5>
                <div class="preview-modal" v-if="previewContent">
                    <div v-html="previewContent.content"></div>
                </div>

                <div class="nk-modal-action justify-end">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="previewModal = false" class="link link-primary">Close</a></li>
<!--                        <li><button class="btn btn-primary"  @click="createFolder" >Create</button></li>-->
                    </ul>
                </div>
            </VueFinalModal>

            <VueFinalModal v-model="showCreateFolderModal" classes="vue-modal-container" content-class="vue-modal-content">
                <button class="menu-toggler active icon-close modal__close" @click="showCreateFolderModal = false"><em class="menu-off menu-icon ni ni-cross"></em></button>

                <div class="nk-upload-form">
                    <h5 class="title mb-3">
                        Create new folder:
                    </h5>
                    <div class="input-group">
                        <div class="input-group-append">
                            <span class="input-group-text">{{currentPath}}</span>
                        </div>
                        <input type="text" v-model="newFolderName" @change="updateFolderName" placeholder="Name of new folder" class="form-control input-group-sm">
                    </div>

                </div>

                <div class="nk-modal-action justify-end">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="#" @click="showCreateFolderModal = false" class="link link-primary">Cancel</a></li>
                        <li><button class="btn btn-primary"  @click="createFolder" >Create</button></li>
                    </ul>
                </div>
            </VueFinalModal>

            <VueFinalModal v-model="showUploadModal" classes="vue-modal-container" content-class="vue-modal-content">
                <button class="menu-toggler active icon-close modal__close" @click="showUploadModal = false"><em class="menu-off menu-icon ni ni-cross"></em></button>

                            <div class="nk-upload-form">
                                <h5 class="title mb-3">
                                    Upload {{isUploadFolder?'Folder':'Files'}}
                                    <p class="to-folder">
                                        <em class="icon ni ni-folder-check"></em>: /{{currentPath}}
                                    </p>
                                </h5>
                                <div class="upload-zone-canic small bg-lighter">
                                    <input type="file" id="1syncFolder" name="fileList" :webkitdirectory="isUploadFolder==true?'webkitdirectory': undefined" :multiple="isUploadFolder==false?'multiple':''" @change="prepairUpload" style="opacity: 0.0; position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height:100%;cursor: pointer;" />
                                    <div class="dz-message" data-dz-message>
                                        <span class="dz-message-text"><span>Drag and drop</span> file here or <span>browse</span></span>
                                    </div>
                                </div>
                            </div>
                            <h6 class="title">Waiting to upload ({{uploadFiles.length-uploadFilesStatus.length}})</h6>
                            <div class="nk-upload-list">
                                <div class="nk-upload-item" v-for="(file, idx) in uploadFiles">
                                    <div class="nk-upload-icon-small">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                                            <g>
                                                <path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#599def" />
                                                <path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#c2e1ff" />
                                                <rect x="27" y="31" width="18" height="2" rx="1" ry="1" style="fill:#fff" />
                                                <rect x="27" y="36" width="18" height="2" rx="1" ry="1" style="fill:#fff" />
                                                <rect x="27" y="41" width="18" height="2" rx="1" ry="1" style="fill:#fff" />
                                                <rect x="27" y="46" width="12" height="2" rx="1" ry="1" style="fill:#fff" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="nk-upload-info">
                                        <div class="nk-upload-title"><span class="title">{{isUploadFolder?file.webkitRelativePath:file.name}}</span> <span class="upload-size">{{file.size/1000}} KB</span> </div>
                                    </div>
                                    <div class="nk-upload-action">

                                        <a class="btn btn-icon-upload" v-if="uploadFilesStatus &&  uploadFilesStatus[idx]==1" disabled><em class="icon-upload fa fa-spinner fa-spin text-info"></em></a>

                                        <a class="btn btn-icon-upload" v-if="uploadFilesStatus && uploadFilesStatus[idx]==2" disabled><em class="icon-upload fa fa-check-circle text-success"></em></a>

                                        <a class="btn btn-icon-upload" v-if="!uploadFilesStatus || !uploadFilesStatus[idx]">
                                            <em class="icon-upload fa fa-trash"></em>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-modal-action justify-end">
                                <ul class="btn-toolbar g-4 align-center">
                                    <li><a href="#" class="link link-primary">Cancel</a></li>
                                    <li><button class="btn btn-primary" :disabled="uploadFiles.length-uploadFilesStatus.length==0" @click="uploadFolder" >Start Upload</button></li>
                                </ul>
                            </div>
            </VueFinalModal>
            <VueFinalModal v-model="showModalSetting" classes="vue-modal-container" content-class="vue-modal-content">
                <button class="menu-toggler active icon-close modal__close" @click="showModalSetting = false"><em class="menu-off menu-icon ni ni-cross"></em></button>

                <div class="nk-upload-form">
                    <h5 class="title mb-3">
                        Settings
                    </h5>


                    <div class="row">
                        <div class="col-6">
                            Public my drive as webserver:
                        </div>
                        <div class="col-6">
                            Choose your domain:
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="custom-control custom-switch me-n2 ">
                                <input type="checkbox" class="custom-control-input" id="isPublic" v-model="isPublic">
                                <label class="custom-control-label" for="isPublic"></label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="domain" required v-model="customDomain">
                                <div class="input-group-append">
                                    <span class="input-group-text" id="customDomain">.canic.app</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nk-modal-action justify-end">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="showModalSetting = false" class="link link-primary">Close</a></li>
                        <li><button class="btn btn-primary" @click="btnUpdateSetting">Save </button></li>
                    </ul>
                </div>
            </VueFinalModal>

            <VueFinalModal v-model="loginModal" classes="vue-modal-container" content-class="vue-modal-content">
                <button class="menu-toggler active icon-close modal__close" @click="loginModal = false"><em class="menu-off menu-icon ni ni-cross"></em></button>
                <h5 class="title mb-3">
                    Login
                </h5>
                <LoginModal />

                <div class="nk-modal-action justify-end">
                    <ul class="btn-toolbar g-4 align-center">
                        <li><a href="javascript:void(0)" @click="loginModal = false" class="link link-primary">Close</a></li>
                    </ul>
                </div>
            </VueFinalModal>

        </div><!-- .nk-fmg-body-content -->
    </div><!-- .nk-fmg-body -->

</template>
<style>
    #syncFolder{
        cursor: pointer;
    }
    .disabled{
        cursor: not-allowed;
        pointer-events: none;
    }
    .upload-zone-canic.dz-clickable {
        cursor: pointer;
    }
    .upload-zone-canic.small {
        min-height: 86px;
    }
    .nk-upload-list{
        max-height: 300px;
        overflow: auto;
    }
    .upload-zone-canic {
        min-height: 150px;
        border: 1px dashed #e5e9f2;
        border-radius: 4px;
        background: white;
        padding: 20px 20px;
        position: relative;
    }
    .upload-zone-canic, .upload-zone-canic * {
        box-sizing: border-box;
    }
    .upload-zone-canic.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {
        cursor: pointer;
    }
    .upload-zone-canic .dz-message {
        text-align: center;
        margin: 1em 0;
    }
    .upload-zone-canic .dz-message-text span {
        display: inline-block;
        color: #2263b3;
    }
    .nk-upload-icon-small{
        width: 36px;
    }
    .upload-size{
        color: #96aac3;
        padding-left: 5px;
        font-size: 0.75rem;
        font-weight: normal;
    }
    .nk-upload-item{
        padding: 0.1rem;
        margin: 0.3rem 0.3rem;
    }
    .nk-upload-title .title {
        font-size: 0.75rem;
        font-weight: normal;
    }
    .icon-upload{
        line-height: inherit;
        font-size: 1rem;
    }
    .btn-icon-upload:hover{
        color: #e0a935;
    }
    .to-folder{
        font-size: 1rem;
        font-weight: 500;
        /* color: #4b8dd1; */
        padding-top: 5px;
        border-bottom: 1px solid #cccc;
    }
    .files-loading{
        text-align: center;
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #e7e3e3;
        height: 300px;
        padding-top: 95px;
    }
    .files-loading > .empty-icon{
        width: 70px;
        margin: auto;
        color: #CCCCCC;
    }
    .preview-modal{
        text-align: center;
    }
    .preview-image{
        max-height: 250px;
        /* width: 100%; */
        height: auto;
        text-align: center;
    }
</style>