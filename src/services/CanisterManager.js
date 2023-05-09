import _apiHandler from "@/ic/api";
import { IDL } from "@dfinity/candid";
import {walletData} from "@/services/store";
import config from "@/config";
import {textToPrincipal} from "@/ic/utils";
import {Principal} from "@dfinity/principal";
const API_PUBLIC = _apiHandler.connect(config.IC_ENPOINT);

const getCategory = async () =>{
    return await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_categories();
};
//Deploy
const handleDeploy = async (targetCanister, method, imageId, _args) =>{
    return await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).control_canister(Principal.fromText(targetCanister), method, Number(imageId), _args);
};
const requestNewCanister = async (canisterName)=>{
    try{
        return await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).create_new_canister(canisterName);
    }catch (e) {
        console.log('e:',e);
        return {"err": "Could not create new canister right now, please try again!"}
    }
}
const getCanisterImage = async(imageId)=>{
    let _images = await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_image(imageId);
    return _images["ok"];
};
const getCanisterImages = async () =>{
    let _images = await API_PUBLIC.canister(config.CANISTER_MANAGER_ID).get_images();
    console.log('_images: ', _images);
    let _images_data = _images.map( img => {
        return {
            image_id: img[0],
            category: img[1].category,
            thumbnail: img[1].thumbnail,
            creator: img[1].creator,
            code: img[1].code,
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
                                    'transfer_fee': Number(formData.transfer_fee),
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
            var _base64 = await toBase64(formData.tokenLogo);
            _args = Array.from(IDL.encode(
                [ IDL.Text, IDL.Text,  IDL.Text, IDL.Nat8, IDL.Nat, IDL.Principal, IDL.Nat],
                [ _base64, formData.tokenName, formData.tokenSymbol, Number(formData.decimals), Number(formData.totalSupply*config.E8S), textToPrincipal(formData.feeTo), Number(formData.fees*config.E8S)
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
    const _api = _apiHandler.connect(config.IC_ENPOINT, walletData.principal);

}
const makePayment = async (data) => {
    const _api = _apiHandler.connect(config.IC_ENPOINT, walletData.principal);
    let approve = await _api.canister(config.XCANIC_CANISTER_ID).approve(textToPrincipal(config.CANISTER_MANAGER_ID), data.amount*100000000);
    console.log('approve: ', approve);
    let payment = _api.canister(config.CANISTER_MANAGER_ID).makePayment();
    console.log('payment: ', payment);
};
const getCanisterPrice = async ()=>{
    const _api = _apiHandler.connect(config.IC_ENPOINT, walletData.principal);
    let price = await _api.canister(config.CANISTER_MANAGER_ID).price();
    return price;
};
const getMyCanister = async ()=>{
    const _api = _apiHandler.connect(config.IC_ENPOINT, walletData.principal);
    let myCanister = await _api.canister(config.CANISTER_MANAGER_ID).my_canister();
    return myCanister;
};
const getCanister = async (canisterId)=>{
    const _api = _apiHandler.connect(config.IC_ENPOINT);
    let _canisterDetail= await _api.canister(config.CANISTER_MANAGER_ID).get_canister(textToPrincipal(canisterId));
    if (Object.prototype.hasOwnProperty.call(_canisterDetail,"ok")){
        return _canisterDetail.ok;
    }else{
        return null;
    }
};
const getCanisterHistory = async (canisterId)=>{
    const _api = _apiHandler.connect(config.IC_ENPOINT);
    let _history= await _api.canister(config.CANISTER_MANAGER_ID).get_canister_history(textToPrincipal(canisterId));
    return _history;
};
const getCanisterStatus = async (canisterId) => {
    console.log('status: ', 'started!');
    const _api = _apiHandler.connect(config.IC_ENPOINT, walletData.principal);
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
    toBase64,
    makePayment,
    getCanisterPrice,
    showLoading,
    getMyCanister,
    getCanisterHistory,
    getCanister,
    getCanisterStatus,
    createInitParams,
    handleDeploy,
    requestNewCanister
};
export default _canisterManager;