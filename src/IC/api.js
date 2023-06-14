import { Actor, HttpAgent } from "@dfinity/agent";
import config from "../config";
import { walletData } from "../services/store";
// Imports and re-exports candid interface
import canic from './candid/canic.did.js';
import IC from './candid/ic.did.js';
//Import standard IDL
import ICRC1 from './candid/icrc1.did.js';
import DIP20 from './candid/dip20.did.js';
import ledgerIDL from './candid/ledger.did.js';
import governanceIDL from './candid/governance.did.js';
import canisterManager from './candid/canisterManager.did.js';
import nnsIDL from './candid/nns.did.js';
import cyclesIDL from './candid/cycles.did.js';
import icLightHouse from './candid/icLightHouse.did.js'
import icpSwap from './candid/icpSwap.did.js'
import storage from './candid/storage.did.js'
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = config.CANIC_APP;//process.env.BUCKET_CANISTER_ID;
const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";

const _preloadedIdls = {
    'ledger' : LEDGER_CANISTER_ID,
    'ICRC1' : ICRC1,
    'DIP20' : DIP20,
    'IC': IC
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
        'aaaaa-aa' : IC,
        'governance' : governanceIDL,
        'ledger' : ledgerIDL,
        'ryjl3-tyaaa-aaaaa-aaaba-cai' : ledgerIDL,
        'rnczv-riaaa-aaaap-qbbwq-cai': canic,
        'j4d4d-pqaaa-aaaak-aanxq-cai': icLightHouse,
        '4qix3-5iaaa-aaaag-qbljq-cai': icpSwap,
        [config.CANISTER_MANAGER_ID]: canisterManager,
        [config.CANISTER_CYCLE_MINTING]: cyclesIDL,
        [config.CANISTER_STORAGE_ID]: storage,
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
                this._canisters[cid] = Actor.createActor(idl, {agent : this._agent, canisterId : cid});
            }
        }
        return this._canisters[cid];
    }

    _makeAgent() {
        if (window?.ic?.plug?.agent) {
            this._agent = window.ic.plug.agent;
            if(config.ENV == "development") {
                window.ic?.plug.sessionManager.sessionData?.agent.fetchRootKey()
            }

        } else if (window?.ic?.bitfinityWallet?.agent) {
            this._agent = window.ic.bitfinityWallet.agent;
        } else {
            var args = {};
            if (this._identity) args['identity'] = this._identity;
            if (this._host) args['host'] = this._host;
            this._agent = new HttpAgent(args);
            if(config.ENV == "development") {
                this._agent.fetchRootKey().catch(err=>{
                    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
                    console.error(err);
                });
            }
        }
    }
}
export default {
    connect : (identity) => new ICnetwork(config.IC_ENDPOINT, identity),
    authConnect: () => new ICnetwork(config.IC_ENDPOINT, walletData.principal)
};
