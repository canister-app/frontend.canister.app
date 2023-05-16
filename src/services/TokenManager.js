import _apiHandler from "@/ic/api";
import { IDL } from "@dfinity/candid";
import {walletData} from "@/services/store";
import config from "@/config";
import {textToPrincipal} from "@/ic/utils";
import {Principal} from "@dfinity/principal";
import {principalToText, canisterStatus} from "../IC/utils";
const API_PUBLIC = _apiHandler.connect(config.IC_ENDPOINT);
const API_AUTHEN = () =>{
    console.log('authenticed')
    return _apiHandler.connect(config.IC_ENDPOINT, walletData.principal);
}
const getMetaData = async (canisterId, standard) =>{
    switch (standard) {
        case "ICRC-1": return getICRC1Metadata(canisterId);break;
        case "DIP20": return getDIP20Metadata(canisterId);break
    }
};
const balance = async(standard, canisterId)=>{
    return await API_PUBLIC.canister(canisterId, standard).balanceOf(walletData.principal.getPrincipal());
}
const transfer = async(standard, canisterId, to, amount)=>{
    const _api = API_AUTHEN();
    if(standard == 'ICRC-1'){
        return await _api.canister(canisterId, standard).icrc1_transfer(textToPrincipal(to), amount*config.E8S);
    }else{
        return await _api.canister(canisterId, standard).transfer(textToPrincipal(to), amount*config.E8S);
    }
}
const mint = async(standard, canisterId, to, amount)=>{
    const _api = API_AUTHEN();
    return await _api.canister(canisterId, standard).mint(textToPrincipal(to), amount*config.E8S);
}
const burn = async(standard, canisterId, amount)=>{
    const _api = API_AUTHEN();
    return await _api.canister(canisterId, standard).burn(amount*config.E8S);
}
const getICRC1Metadata = async (canisterId)=>{
    let _data = await API_PUBLIC.canister(canisterId, 'ICRC-1').icrc1_metadata();
    let _owner = await API_PUBLIC.canister(canisterId, 'ICRC-1').icrc1_minting_account();
    let _totalSupply = await API_PUBLIC.canister(canisterId, 'ICRC-1').icrc1_total_supply();
    let _result = {
        'total_supply': Number(_totalSupply),
        'logo': '',
        'owner': principalToText(_owner[0]['owner'])
    };
    _data.forEach( token =>{
        switch (token[0]) {
            case "icrc1:symbol": _result['symbol'] = token[1]['Text'];break;
            case "icrc1:name": _result['name'] = token[1]['Text'];break;
            case "icrc1:fee": _result['transfer_fee'] = token[1]['Nat'];break;
            case "icrc1:decimals": _result['decimals'] = token[1]['Nat'];break;
        }
    });
    console.log('_result: ', _result);
    return _result;
}
const getDIP20Metadata = async (canisterId)=>{
    let _data = await API_PUBLIC.canister(canisterId, 'DIP20').getMetadata();
    let _result = {
        'transfer_fee': _data.fee,
        'decimals': _data.decimals,
        'owner': _data.owner,
        'logo': _data.logo,
        'name': _data.name,
        'total_supply': Number(_data.totalSupply),
        'symbol': _data.symbol
    };
    return _result;
}
export default {
    getMetaData,
    transfer,
    balance,
    burn,
    mint
};
