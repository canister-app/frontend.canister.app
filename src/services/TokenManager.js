import _api from "@/ic/api";
import { IDL } from "@dfinity/candid";
import {walletData} from "@/services/store";
import config from "@/config";
import {textToPrincipal} from "@/ic/utils";
import {Principal} from "@dfinity/principal";
import {principalToText, canisterStatus} from "../IC/utils";

const getMetaData = async (canisterId, standard) =>{
    switch (standard) {
        case "ICRC-1": return getICRC1Metadata(canisterId);break;
        case "DIP20": return getDIP20Metadata(canisterId);break
    }
};
const balance = async(standard, canisterId)=>{
    if(standard == 'ICRC-1'){
        return await _api.connect().canister(canisterId, standard).icrc1_balance_of(
            {
                owner: walletData.principal.getPrincipal(),
                subaccount: []
            }
        );
    }else{
        return await _api.connect().canister(canisterId, standard).balanceOf(walletData.principal.getPrincipal());
    }
}
const transfer = async(standard, canisterId, to, amount)=>{
    if(standard == 'ICRC-1'){
        let transferArgs = {
            amount: amount*config.E8S,
            created_at_time: [],
            fee: [],
            from_subaccount: [],
            memo: [],
            to: {
                owner: textToPrincipal(to),
                subaccount: []
            },
        };
        console.log('transferArgs: ', transferArgs);
        return await _api.authConnect().canister(canisterId, standard).icrc1_transfer(transferArgs);
    }else{
        return await _api.authConnect().canister(canisterId, standard).transfer(textToPrincipal(to), amount*config.E8S);
    }
}
const mint = async(standard, canisterId, to, amount)=>{
    return await _api.authConnect().canister(canisterId, standard).mint(textToPrincipal(to), amount*config.E8S);
}
const burn = async(standard, canisterId, amount)=>{
    return await _api.authConnect().canister(canisterId, standard).burn(amount*config.E8S);
}
const getICRC1Metadata = async (canisterId)=>{
    let _data = await _api.connect().canister(canisterId, 'ICRC-1').icrc1_metadata();
    let _owner = await _api.connect().canister(canisterId, 'ICRC-1').icrc1_minting_account();
    let _totalSupply = await _api.connect().canister(canisterId, 'ICRC-1').icrc1_total_supply();
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
    let _data = await _api.connect().canister(canisterId, 'DIP20').getMetadata();
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
