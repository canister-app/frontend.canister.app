import config from "../config";
import RosettaApi from '@/services/RosettaApi.js';
import {Buffer} from "buffer";
import {Principal} from "@dfinity/principal";
import { sha224 } from '@dfinity/principal/lib/esm/utils/sha224';
import { getCrc32 } from '@dfinity/principal/lib/esm/utils/getCrc';

export const rosettaApi = new RosettaApi();

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
    console.log('t: ', t);
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
const getSubAccountArray = (s) => {
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
const toHexString = (byteArray)  =>{
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
export const isMultiInput = (name)=>{
    const regex = /\[\]/g;
    return name.match(regex);
}
export default {
    showLoading,
    genPreviewTag,
    checkIsValidDomain,
    rosettaApi,
    textToPrincipal,
    formatICP,
    principalToAccountIdentifier,
    principalToText,
    validateAddress,
    validatePrincipal,
    isMultiInput
}