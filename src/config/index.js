const CANIC_APP = 'rnczv-riaaa-aaaap-qbbwq-cai';
const CANISTER_MANAGER_ID = 'xq3hn-siaaa-aaaap-qbg7a-cai';//bkyz2-fmaaa-aaaaa-qaaaq-cai
const CANIC_CANISTER_URL = 'https://'+CANIC_APP+'.raw.icp0.io'
const NETWORK = {
    "development": {
        canister_id: "bkyz2-fmaaa-aaaaa-qaaaq-cai",
        endpoint: "http://127.0.0.1:8000",
        scan: "http://127.0.0.1:8000/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id="
    },
    "staging": {
        canister_id: "xq3hn-siaaa-aaaap-qbg7a-cai",
        endpoint: "https://icp0.io",
        scan: "https://icscan.io/canister/"
    },
    "production": {
        canister_id: "psh4l-7qaaa-aaaap-qasia-cai",
        endpoint: "https://icp0.io",
        scan: "https://icscan.io/canister/"
    }
}
const ENV = "staging";// //development, staging, production
const config = {
    backend_api: 'https://ico-proxy.canister.app/api/',
    APP_VERSION: '0.1.0',
    ENV: ENV,
    IC_ENDPOINT: NETWORK[ENV]['endpoint'],//https://boundary.ic0.app/
    CANIC_APP: CANIC_APP,
    CANISTER_MANAGER_ID: NETWORK[ENV]['canister_id'],
    CANISTER_CYCLE_MINTING: "rkp4c-7iaaa-aaaaa-aaaca-cai",
    CANISTER_IC_MANAGEMENT: "aaaaa-aa",
    LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    CANIC_CANISTER_URL: CANIC_CANISTER_URL,
    CUSTOM_DOMAIN_MAXLENGTH: 32,//Max length for custom domain
    CANISTER_WHITE_LIST: [
        CANISTER_MANAGER_ID
    ],
    CANISTER_IMAGE_CATEGORY: {
        [0]: "Tokens",
        [1]: "NFT",
        [3]: "Tools",
        [2]: "DAO",
    },
    STANDARD: (imageId) =>{
        switch (Number(imageId)) {
            case 1000: return "ICRC-1";break;
            case 1001: return "NFT";break;
            case 1004: return "DIP20";break;
        }
    },
    E8S: 100_000_000,
    CYCLES: 1_000_000_000_000,
    FEE: 10_000,
    MIN_DEPOSIT: 10_000*10,
    IC_SCAN: NETWORK[ENV]['scan']
}
export default config;