import _api from "@/IC/api";
import config from "../config";
export const createFile = async (fileUpload) =>{
    return await _api.authConnect().canister(config.CANISTER_STORAGE_ID).createFile(fileUpload);
}
export const getFiles = async () =>{
    return await _api.authConnect().canister(config.CANISTER_STORAGE_ID).getFiles();
}
export const putFileChunk = async (fileId, chunk, sliceToNat) =>{
    return await _api.authConnect().canister(config.CANISTER_STORAGE_ID).putFileChunk(fileId, chunk, sliceToNat);
}
export const removeFile = async (fileId) =>{
    return await _api.authConnect().canister(config.CANISTER_STORAGE_ID).removeFile(fileId);
}
export default {
    createFile,
    getFiles,
    putFileChunk,
    removeFile
};