import _apiHandler from "@/ic/api";
import { IDL } from "@dfinity/candid";
import {walletData} from "@/services/store";
import config from "@/config";
import {textToPrincipal} from "@/ic/utils";
import {Principal} from "@dfinity/principal";
import {principalToText, canisterStatus} from "../IC/utils";
const API_PUBLIC = _apiHandler.connect(config.IC_ENDPOINT);
const API_AUTHEN = () =>{
    return _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);
}
const getCategory = async () =>{
    return await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_categories();
};
//Deploy: Install/reinstall
const handleDeploy = async (targetCanister, canisterName, method, imageId, _args) =>{
    const _api = API_AUTHEN();
    return await _api.canister(config.CANISTER_MANAGER_ID).canister_control(Principal.fromText(targetCanister), canisterName, method, Number(imageId), _args);
};
const handleAction = async (targetCanister, method)=>{
    const _api = _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);
    return await _api.canister(config.CANISTER_MANAGER_ID).canister_action(Principal.fromText(targetCanister), method);
};
const requestNewCanister = async (canisterName)=>{
    const _api = API_AUTHEN();
    try{
        return await _api.canister(config.CANISTER_MANAGER_ID).create_new_canister(canisterName);
    }catch (e) {
        console.log('e:',e);
        return {"err": "Could not create new canister right now, please try again!"}
    }
}
const getCanisterImage = async(imageId)=>{
    let _images = await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_image(imageId);
    return _images["ok"];
};
//Get simple image for mapping data
const getImageList = async()=>{
    let _images = await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_images_list();
    let _imgObj = {};
    _images.forEach( img => {
        _imgObj[Number(img[0])] = img[1];
    });
    return _imgObj;
}
const getCanisterImages = async () =>{
    let _images = await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_images();
    let _images_data = _images.map( img => {
        return {
            image_id: img[0],
            category: img[1].category,
            thumbnail: img[1].thumbnail,
            creator: img[1].creator,
            code: img[1].code,
            brief: img[1].brief,
            description: img[1].description,
            name: img[1].name,
            repo: img[1].repo,
            created: img[1].time,
            updated: img[1].updated,
            approved: img[1].approved,
            verified: img[1].verified,
            metadata: img[1].metadata,
        };
    });
    return _images_data;
}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
const createInitParams = async(formData)=>{
    let _args;
    switch (formData.token_standard) {
        case "ICRC-1":
            const Value = IDL.Variant({
                'Int' : IDL.Int,
                'Nat' : IDL.Nat,
                'Blob' : IDL.Vec(IDL.Nat8),
                'Text' : IDL.Text,
            });
            const Subaccount = IDL.Vec(IDL.Nat8);
            const Account = IDL.Record({
                'owner' : IDL.Principal,
                'subaccount' : IDL.Opt(Subaccount),
            });
            const InitArgs = IDL.Record({
                'token_symbol' : IDL.Text,
                'transfer_fee' : IDL.Nat64,
                'metadata' : IDL.Vec(IDL.Tuple(IDL.Text, Value)),
                'minting_account' : Account,
                'initial_balances' : IDL.Vec(IDL.Tuple(Account, IDL.Nat64)),
                'archive_options' : IDL.Record({
                    'num_blocks_to_archive' : IDL.Nat64,
                    'trigger_threshold' : IDL.Nat64,
                    'max_message_size_bytes' : IDL.Opt(IDL.Nat64),
                    'cycles_for_archive_creation' : IDL.Opt(IDL.Nat64),
                    'node_max_memory_size_bytes' : IDL.Opt(IDL.Nat64),
                    'controller_id' : IDL.Principal,
                }),
                'token_name' : IDL.Text,
            });
            const LedgerArg = IDL.Variant({
                'Init' : InitArgs,
            });
            _args = Array.from(
                new Uint8Array(
                    IDL.encode(
                        [LedgerArg],
                        [
                            {
                                Init: {
                                    'token_symbol': formData.token_symbol,
                                    'transfer_fee': Number(formData.transfer_fee)*config.E8S,
                                    'metadata': [],
                                    'minting_account': {owner: Principal.fromText(formData.token_owner), subaccount: []},
                                    'initial_balances': [],
                                    'archive_options': {
                                        'num_blocks_to_archive': 1000,
                                        'trigger_threshold': 2000,
                                        'max_message_size_bytes': [],
                                        'cycles_for_archive_creation': [],
                                        'node_max_memory_size_bytes': [],
                                        'controller_id': Principal.fromText(formData.token_owner),
                                    },
                                    'token_name': formData.token_name,
                                },
                            }
                        ],
                    ),
                ),
            );
            break;
        case "EXT-NFT":
            _args = Array.from(
                new Uint8Array(
                    IDL.encode(
                        [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat64],
                        [textToPrincipal(formData.collection_owner), formData.collection_name, formData.royalty_address, Number(formData.royalty_fee)])
                )
            );
            break;
        case "Threshold":
        _args = Array.from(
            new Uint8Array(
                IDL.encode(
                    [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat64],
                    [textToPrincipal(formData.collection_owner), formData.collection_name, formData.royalty_address, Number(formData.royalty_fee)])
            )
        );
        break;
        case "DIP20":
            var _base64 = await toBase64(formData.token_logo);
            _args = Array.from(IDL.encode(
                [ IDL.Text, IDL.Text,  IDL.Text, IDL.Nat8, IDL.Nat, IDL.Principal, IDL.Nat],
                [ _base64, formData.token_name, formData.token_symbol, Number(formData.decimals), Number(formData.total_supply*config.E8S), textToPrincipal(formData.token_owner), Number(formData.transfer_fee*config.E8S)
                ]));
            break;
        case "Axon":
            _args = [];
            break;
        default:
            _args = [];
            break;
    }
    return _args;
}
const deployCanister = async(data)=>{
    const _api = _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);

}
const makePayment = async (data) => {
    const _api = _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);
    let approve = await _api.canister(config.XCANIC_CANISTER_ID).approve(textToPrincipal(config.CANISTER_MANAGER_ID), data.amount*100000000);
    console.log('approve: ', approve);
    let payment = _api.canister(config.CANISTER_MANAGER_ID).makePayment();
    console.log('payment: ', payment);
};
const getCanisterPrice = async ()=>{
    const _api = _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);
    let price = await _api.canister(config.CANISTER_MANAGER_ID).price();
    return price;
};
const getMyCanister = async ()=>{
    const _api = API_AUTHEN();
    let myCanister = await _api.canister(config.CANISTER_MANAGER_ID).my_canister();
    console.log('myCanister: ', myCanister);
    return myCanister.map( cani =>{
        let _status = "---";
        switch(Number(cani[1].status)){
            case 1: _status = "Running";break;
            case 2: _status = "Stoped";break;
            case 3: _status = "Deleted";break;
            default: _status = "Ready";break;
        }
        return {
            heading: false,
            idx: Number(cani[0]),
            canisterId: principalToText(cani[1].canisterId),
            canisterName: cani[1].canisterName,
            canisterLabel: cani[1].canisterName + ': '+principalToText(cani[1].canisterId)+ ' ('+_status+')',
            status: canisterStatus(cani[1].status),
            statusCode: Number(cani[1].status),
            owner: principalToText(cani[1].owner),
            created: cani[1].created,
            updated: cani[1].updated,
            cycles: cani[1].cycles,
            cycles_updated: cani[1].cycles_updated,
            imageId: Number(cani[1].imageId)
        }
    })
};
const getCanister = async (canisterId)=>{
    const _api = API_AUTHEN();
    let _canisterDetail= await _api.canister(config.CANISTER_MANAGER_ID).get_canister(textToPrincipal(canisterId));
    if (Object.prototype.hasOwnProperty.call(_canisterDetail,"ok")){
        return _canisterDetail.ok;
    }else{
        return null;
    }
};
const getCanisterStatus = async (canisterId)=>{
    const _api = API_AUTHEN();
    let _canisterDetail= await _api.canister(config.CANISTER_MANAGER_ID).get_canister_status(textToPrincipal(canisterId));
    if (Object.prototype.hasOwnProperty.call(_canisterDetail,"ok")){
        return _canisterDetail.ok;
    }else{
        return null;
    }
};
const getCanisterHistory = async (canisterId)=>{
    const _api = _apiHandler.connect(config.IC_ENDPOINT);
    let _history= await _api.canister(config.CANISTER_MANAGER_ID).get_canister_history(textToPrincipal(canisterId));
    return _history;
};
const getCanisterStatusCheck = async (canisterId) => {
    console.log('status: ', 'started!');
    const _api = _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);
    let _status = await _api.canister("aaaaa-aa").canister_status({ canister_id: textToPrincipal(canisterId)});
    console.log('status: ', _status);
    return _status;
};
const showLoading = html=>{
    window.Swal.fire({
        html: html,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            window.Swal.showLoading()
        }
    });
};

const _canisterManager = {
    getCategory,
    getCanisterImages,
    getCanisterImage,
    getImageList,
    toBase64,
    makePayment,
    getCanisterPrice,
    showLoading,
    getMyCanister,
    getCanisterHistory,
    getCanister,
    getCanisterStatus,
    getCanisterStatusCheck,
    createInitParams,
    handleDeploy,
    handleAction,
    requestNewCanister
};
export default _canisterManager;