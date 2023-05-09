import { Actor, HttpAgent } from "@dfinity/agent";
import config from "../config";
import { walletData } from "../services/store";
// Imports and re-exports candid interface
import canic from './candid/canic.did.js';

import ledgerIDL from './candid/ledger.did.js';
import governanceIDL from './candid/governance.did.js';
import canisterManager from './candid/canisterManager.did.js';
import nnsIDL from './candid/nns.did.js';
import cyclesIDL from './candid/cycles.did.js';

// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = config.CANIC_APP;//process.env.BUCKET_CANISTER_ID;
const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";

const _preloadedIdls = {
    'ledger' : LEDGER_CANISTER_ID,
};
class ExtensionActor {
    _canister = false;
    _idl = false;
    _actor = false;
    _type = "";
    constructor(canister, idl, type) {
        if (canister) this._canister = canister;
        if (idl) this._idl = idl;
        if (type) this._type = type;
        return new Proxy(this, {
            get : (target, name) => {
                return async function() {
                    if (!target._actor) {
                        target._actor = await window.ic[target._type].createActor({
                            canisterId: target._canister,
                            interfaceFactory: target._idl,
                        });
                    }
                    return await target._actor[name](...arguments);
                }
            }
        });
    }
}
class ICnetwork {
    //map known canisters to preloaded IDLs
    _mapIdls = {
        'governance' : governanceIDL,
        'ledger' : ledgerIDL,
        'ryjl3-tyaaa-aaaaa-aaaba-cai' : ledgerIDL,
        'rnczv-riaaa-aaaap-qbbwq-cai': canic,
        [config.CANISTER_MANAGER_ID]: canisterManager,
    };

    _identity = false;
    _host = false;
    _agent = false;
    _canisters = {};

    constructor(host, identity) {
        if (identity) this._identity = identity;
        if (host) this._host = host;
        this._makeAgent();
    }

    canister(cid, idl) {
        if (!idl){
            if (Object.prototype.hasOwnProperty.call(this._mapIdls, cid)) {
                idl = this._mapIdls[cid];
            } else {
                idl = _preloadedIdls['default'];
            }
        } else if (typeof idl == 'string') {
            if (Object.prototype.hasOwnProperty.call(_preloadedIdls, idl)) {
                idl = _preloadedIdls[idl];
            } else {
                throw new Error(idl + " is not a preloaded IDL");
            }
        }
        if (!Object.prototype.hasOwnProperty.call(this._canisters, cid)){
            if (walletData.isLogged && (walletData.isLogged == "bitfinity" || walletData.isLogged == "plug")) {
                let _targetType = walletData.isLogged == "bitfinity"?"bitfinityWallet":"plug";
                this._canisters[cid] = new ExtensionActor(cid, idl, _targetType);
            } else {
                if(config.ENV == "development") {
                    console.log('Fetchroot development')
                    this._agent.fetchRootKey().catch(err=>{
                        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
                        console.error(err);
                    });
                }
                console.log('cid: ', cid);
                this._canisters[cid] = Actor.createActor(idl, {agent : this._agent, canisterId : cid});
            }
        }
        return this._canisters[cid];
    }


    _makeAgent() {
        if (window?.ic?.plug?.agent) {
            this._agent = window.ic.plug.agent;
        } else if (window?.ic?.bitfinityWallet?.agent) {
            this._agent = window.ic.bitfinityWallet.agent;
        } else {
            var args = {};
            if (this._identity) args['identity'] = this._identity;
            if (this._host) args['host'] = this._host;
            this._agent = new HttpAgent(args);
        }
    }
}
export const getFolder = async (path) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal?walletData.principal:null);
    return await _api.canister(config.CANIC_APP).getFolder(path);
}
export const createFolder = async (path) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).createFolder(path);
}
export const whoami = async () =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).whoami();
}
export const uploadFile = async (fileUpload) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).createFile(fileUpload);
}
export const createFile = async (fileUpload) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).createFile(fileUpload);
}
export const updateSetting = async (customDomain, isPublic) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).updateSetting(customDomain, isPublic);
}
export const putFileChunk = async (fileId, chunk, sliceToNat) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).putFileChunk(fileId, chunk, sliceToNat);
}
export const deleteAsset = async (_path) =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).deleteAsset(_path);
}
export const getSetting = async () =>{
    const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);
    return await _api.canister(config.CANIC_APP).getSetting();
}

export const _apiHandle = {
    connect : (host, identity) => new ICnetwork(host ? host : "https://icp-api.io", identity),
}
// export const _api = _apiHandle.connect("https://icp-api.io", walletData.principal);

// const _api = createActor(canisterId,
//     {
//         agentOptions: {
//             host: 'http://localhost:8000'
//         }
//     });
export default {
    connect : (host, identity) => new ICnetwork(host ? host : config.IC_ENPOINT, identity),
    getFolder,
    createFolder,
    whoami,
    uploadFile,
    createFile,
    updateSetting,
    getSetting,
    putFileChunk,
    deleteAsset
};
