import config from "../config";
const genPreviewTag = (filename)=>{
    let _ext = getFileExt(filename);
    switch (_ext) {
        case "jpg":
        case "png":
        case "gif":
        case "jpeg":
        case "bmp":
            return "<img src='http://"+config.CANIC_APP+".localhost:8000"+filename+"' class='preview-image'/>";
            break;
        case "txt":
        case "html":
        case "css":
        case "":
            return "<iframe src='http://"+config.CANIC_APP+".localhost:8000"+filename+"' width=\"100%\" height=\"300\" style=\"border:none;\">";
            break;
        default:
            return "<div class='preview-not-available'>Preview not available</div>";
            break;
    }
}
const getFileExt = (filename)=>{
    console.log('filename:', filename)
    return filename?filename.split('.').pop():filename;
}
const _utils = {
    genPreviewTag
}
export default _utils;