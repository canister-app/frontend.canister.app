import _api from "@/IC/api";
import config from "../config";
export const getCategory = async() =>{
    let _category = await _api.connect().canister(config.CANISTER_MANAGER_ID).get_categories();
    return _category.map( cate => {
        return {
            category_id: cate[0],
            name: cate[1].name,
        };
    });
}

export const createImage = async(_imageObj)=>{
    return await _api.authConnect().canister(config.CANISTER_MANAGER_ID).add_canister_image(_imageObj);
}
export const editImage = async(imageId, _imageObj)=>{
    return await _api.authConnect().canister(config.CANISTER_MANAGER_ID).edit_canister_image(imageId, _imageObj);
}
export default {
    getCategory,
    editImage,
    createImage,
};