<template>
    <!-- @@ File Upload Modal @e -->
    <div class="modal fade" tabindex="-1" role="dialog" id="file-upload">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <a href="#" class="close" data-bs-dismiss="modal"><em class="icon ni ni-cross-sm"></em></a>
                <div class="modal-body modal-body-md">
                    <div class="nk-upload-form">
                        <h5 class="title mb-3">Upload File</h5>
                        <div class="upload-zone small bg-lighter">
                            <div class="dz-message" data-dz-message>
                                <span class="dz-message-text"><span>Drag and drop</span> file here or <span>browse</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="nk-upload-list">
                        <h6 class="title">Uploaded Files</h6>
                        <div class="nk-upload-item">
                            <div class="nk-upload-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                                    <g>
                                        <rect x="16" y="14" width="40" height="44" rx="6" ry="6" style="fill:#7e95c4" />
                                        <rect x="32" y="17" width="8" height="2" rx="1" ry="1" style="fill:#fff" />
                                        <rect x="32" y="22" width="8" height="2" rx="1" ry="1" style="fill:#fff" />
                                        <rect x="32" y="27" width="8" height="2" rx="1" ry="1" style="fill:#fff" />
                                        <rect x="32" y="32" width="8" height="2" rx="1" ry="1" style="fill:#fff" />
                                        <rect x="32" y="37" width="8" height="2" rx="1" ry="1" style="fill:#fff" />
                                        <path d="M35,14h2a0,0,0,0,1,0,0V43a1,1,0,0,1-1,1h0a1,1,0,0,1-1-1V14A0,0,0,0,1,35,14Z" style="fill:#fff" />
                                        <path d="M38.0024,42H33.9976A1.9976,1.9976,0,0,0,32,43.9976v2.0047A1.9976,1.9976,0,0,0,33.9976,48h4.0047A1.9976,1.9976,0,0,0,40,46.0024V43.9976A1.9976,1.9976,0,0,0,38.0024,42Zm-.0053,4H34V44h4Z" style="fill:#fff" />
                                    </g>
                                </svg>
                            </div>
                            <div class="nk-upload-info">
                                <div class="nk-upload-title"><span class="title">dashlite-latest-version.zip</span></div>
                                <div class="nk-upload-size">25.49 MB</div>
                            </div>
                            <div class="nk-upload-action">
                                <a href="#" class="btn btn-icon btn-trigger" data-bs-dismiss="modal"><em class="icon ni ni-trash"></em></a>
                            </div>
                        </div>
                        <div class="nk-upload-item">
                            <div class="nk-upload-icon">
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
                                <div class="nk-upload-title"><span class="title">Update work history.docx</span> <span class="meta">70% Done</span></div>
                                <div class="nk-upload-progress">
                                    <div class="progress progress-sm">
                                        <div class="progress-bar" data-progress="70"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="nk-upload-action">
                                <a href="#" class="btn btn-icon btn-trigger" data-bs-dismiss="modal"><em class="icon ni ni-trash"></em></a>
                            </div>
                        </div>
                    </div>
                    <div class="nk-modal-action justify-end">
                        <ul class="btn-toolbar g-4 align-center">
                            <li><a href="#" class="link link-primary">Cancel</a></li>
                            <li><button class="btn btn-primary">Add Files</button></li>
                        </ul>
                    </div>
                </div>
            </div><!-- .modal-content -->
        </div><!-- .modla-dialog -->
    </div><!-- .modal -->
</template>