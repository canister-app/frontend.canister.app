const CANIC_APP = 'rnczv-riaaa-aaaap-qbbwq-cai';
const CANIC_CANISTER_URL = 'https://'+CANIC_APP+'.raw.icp0.io'
const config = {
    backend_api: 'https://ico-proxy.canister.app/api/',
    APP_VERSION: '0.1.0',
    ENV: 'development', //production
    CANIC_APP: CANIC_APP,
    CANIC_CANISTER_URL: CANIC_CANISTER_URL,
    CUSTOM_DOMAIN_MAXLENGTH: 32,//Max length for custom domain
    CANISTER_WHITE_LIST: [
        CANIC_APP
    ]
}
export default config;