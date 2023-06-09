import config from "../config";
import RosettaApi from '@/services/RosettaApi.js';
import {Buffer} from "buffer";
import {Principal} from "@dfinity/principal";
import { sha224 } from '@dfinity/principal/lib/esm/utils/sha224';
import { getCrc32 } from '@dfinity/principal/lib/esm/utils/getCrc';
import moment from "moment";
export const rosettaApi = new RosettaApi();
import { useToast } from 'vue-toastification'
const toast = useToast();

const isHex = (h) => {
    var regexp = /^[0-9a-fA-F]+$/;
    return regexp.test(h);
};
export const validateAddress = (a) => {
    return (isHex(a) && a.length === 64)
}
export const validatePrincipal = (p) => {
    try {
        return (p === Principal.fromText(p).toText());
    } catch (e) {
        return false;
    }
}
export const textToPrincipal = (t) => {
    return Principal.fromText(t);
}
export const principalToText = (p) => {
    return typeof(p) == 'object'?Principal.fromUint8Array(p._arr).toText():p;
}
const _accountIdentifier = (u) => {
    if (isHex(u) && u.length === 64) {
        return { 'address' : u.toLowerCase() };
    } else {
        return { 'principal' : Principal.fromText(u) };
    }
};
export const principalToAccountIdentifier = (p, s) => {
    const padding = Buffer("\x0Aaccount-id");
    const array = new Uint8Array([
        ...padding,
        ...Principal.fromText(p).toUint8Array(),
        ...getSubAccountArray(s)
    ]);
    const hash = sha224(array);
    const checksum = to32bits(getCrc32(hash));
    const array2 = new Uint8Array([
        ...checksum,
        ...hash
    ]);
    return toHexString(array2);
};
export const getSubAccountArray = (s) => {
    if (Array.isArray(s)){
        return s.concat(Array(32-s.length).fill(0));
    } else {
        //32 bit number only
        return Array(28).fill(0).concat(to32bits(s ? s : 0))
    }
};
const from32bits = ba => {
    var value;
    for (var i = 0; i < 4; i++) {
        value = (value << 8) | ba[i];
    }
    return value;
}
const to32bits = num => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
}
export const toHexString = (byteArray)  =>{
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}
export const genPreviewTag = (filename)=>{
    let _ext = getFileExt(filename);
    switch (_ext) {
        case "jpg":
        case "png":
        case "gif":
        case "jpeg":
        case "bmp":
            return "<img src='"+config.CANIC_CANISTER_URL+filename+"' class='preview-image'/>";
            break;
        case "txt":
        case "html":
        case "css":
        case "":
            return "<iframe src='"+config.CANIC_CANISTER_URL+filename+"' width=\"100%\" height=\"300\" style=\"border:none;\">";
            break;
        default:
            return "<div class='preview-not-available'>Preview not available</div>";
            break;
    }
}
export const getFileExt = (filename)=>{
    console.log('filename:', filename)
    return filename?filename.split('.').pop():filename;
}
export const checkIsValidDomain = (domain) =>{
    if(domain.length > config.CUSTOM_DOMAIN_MAXLENGTH) return false;
    var re = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]+$/);
    return domain.match(re);
}
export const formatICP = (balance) =>{
    let n = Number(balance) / 100000000;
    return n.toFixed(8).replace(/0{1,6}$/, "");
}
export const showLoading = (text)=>{
    window.Swal.fire({
        html: '<div class="spinner-grow spinner-grow-sm" role="status"></div> '+text,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false
    });
}
export const showSuccess = (text)=>{
    window.Swal.fire({
        icon: 'success',
        title: 'Success',
        html: text,
    })
}
export const showError = (text)=>{
    window.Swal.fire({
        icon: 'error',
        title: 'Error',
        html: text,
    })
}
export const isMultiInput = (name)=>{
    const regex = /\[\]/g;
    return name.match(regex);
}
export const formatDate = (time)=>{
    return moment.utc(Number(time)/1000000).format("LLL");
}
export const timeAgo = (time)=>{
    return moment.utc(Number(time)/1000000).fromNow();
}

function deepCopy(text) {

    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
export const copyToClipboard = (text, item) => {
    if (!navigator.clipboard) {
        deepCopy(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        // toast.clear();
        // toast.info(item+' copied!');
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}
export const unit8ArrToString = (arr)=>{
    return new TextDecoder().decode(arr);
}
export const canisterStatus = (status)=>{
    let _status = null;
    switch(Number(status)){
        case 1: _status = {label: "Running", style: "success"};break;
        case 2: _status = {label: "Stoped", style: "warning"};break;
        case 3: _status = {label: "Deleted", style: "danger"};break;
        default: _status = {label: "Ready", style: "primary"};break;
    }
    return _status;
}
export const ICStatus = (statusObj)=>{
    let _status = null;
    for (const [key] of Object.entries(statusObj)) {
        switch(key){
            case 'running': _status = {label: "Running", style: "success"};break;
            case 'stopping': _status = {label: "Stopping", style: "warning"};break;
            case 'stopped': _status = {label: "Stoped", style: "warning"};break;
            case 'deleted': _status = {label: "Deleted", style: "danger"};break;
            default: _status = {label: "Ready", style: "primary"};break;
        }
    }
    return _status;
}
export const formatter = (number)=>{
    return number?new Intl.NumberFormat().format(number):number;
}

export default {
    showLoading,
    showSuccess,
    showError,
    genPreviewTag,
    checkIsValidDomain,
    rosettaApi,
    textToPrincipal,
    formatICP,
    principalToAccountIdentifier,
    principalToText,
    validateAddress,
    validatePrincipal,
    isMultiInput,
    formatDate,
    timeAgo,
    copyToClipboard,
    unit8ArrToString,
    canisterStatus,
    ICStatus,
    formatter,
    toHexString,
    getSubAccountArray
}