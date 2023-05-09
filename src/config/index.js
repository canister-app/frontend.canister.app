const CANIC_APP = 'rnczv-riaaa-aaaap-qbbwq-cai';
const CANISTER_MANAGER_ID = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
const CANIC_CANISTER_URL = 'https://'+CANIC_APP+'.raw.icp0.io'
const config = {
    backend_api: 'https://ico-proxy.canister.app/api/',
    APP_VERSION: '0.1.0',
    ENV: 'development', //production
    IC_ENPOINT: 'http://127.0.0.1:8000/',//https://boundary.ic0.app/
    CANIC_APP: CANIC_APP,
    CANISTER_MANAGER_ID: CANISTER_MANAGER_ID,
    CANIC_CANISTER_URL: CANIC_CANISTER_URL,
    CUSTOM_DOMAIN_MAXLENGTH: 32,//Max length for custom domain
    CANISTER_WHITE_LIST: [
        CANIC_APP
    ],
    CANISTER_IMAGE_CATEGORY: {
        [0]: "Tokens",
        [1]: "NFT",
        [2]: "Tools",
        [3]: "DAO",
    },
    IC_SCAN: 'https://dashboard.internetcomputer.org/canister/'
}
export default config;