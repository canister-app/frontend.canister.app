import { reactive } from 'vue'
import axios from "axios";
import config from "@/config";
import CanisterManager from "./CanisterManager.js"
// import _apiHandler from "@/ic/api";
import _api from "@/IC/api"
import { rosettaApi } from "../IC/utils.js";
import {WalletManager} from "./WalletManager";

const _accounts = false;//JSON.parse(localStorage.getItem('accounts'));
const _principal = false;//JSON.parse(localStorage.getItem('principal'));
const _w_connected = localStorage.getItem('_w_connected');
const _current_account = JSON.parse(localStorage.getItem('_current_account'));
const _account_index = JSON.parse(localStorage.getItem('_account_index'));
export const walletData = reactive({
    isLogged: _w_connected?_w_connected:false,
    principal: _principal?_principal:false,
    txtPrincipal: "2vxsx-fae",//Default unlogin
    accounts: _accounts?_accounts:false,
    account: _current_account?_current_account:false,
    balance: 0,
    cycleBalance: 0,//Cycles canister
    stakingBalance: 0,
    xcanicBalance: 0,
    canic: 0,
    account_verified: 0,
    canic_locked: 0,
    canicListing: 0,
    canicCreating: 0,
    currentAccount: _account_index?_account_index:0,
    isModalVisible: false,
    lastUpdate: null,
    icpRate: 0,
    icpPrice: 0,
    cycleRate: 3.5127,
    canisterPrice: 0,
    canisterLimit: 0,
    setIdentity(principal){
        this.principal = principal;
        if(principal){
            this.txtPrincipal = principal.getPrincipal().toText();
        }else{
            this.txtPrincipal = "2vxsx-fae"
        }
    },
    setAccount(accounts){
        this.accounts = accounts;
        // localStorage.setItem('accounts', JSON.stringify(accounts));
    },
    setBalance(balance){
        this.balance = balance;
        if(balance == 0){
            this.stakingBalance = 0;
        }
    },
    setCycleBalance(balance){
        this.cycleBalance = balance;
    },
    setCycleRate(rate){
        this.cycleRate = rate;
    },
    async loginAction(wallet){ //Default login action
        this.setCurrentAccountIdx(0);
        this.setLoginState(wallet);
        await this.getBalance();
        // this.getStakingBalance();
        this.setLoginState(wallet);
        localStorage.setItem("_w_connected", wallet);
        this.setModalVisible(false);
        // this.getWalletData();
        // this.getXcanicBalance();
        // this.updateAccountPrincipal();
        //Cycles check!!!!!!!!!!
        // await WalletManager.getCycleRate()
        await WalletManager.getCycleBalance()
    },
    logoutAction(){
        this.stakingBalance = 0;
        this.xcanicBalance = 0;
        this.balance = 0;
        this.cycleBalance = 0;
    },
    setCanicBalance(canic){
        this.canic = canic
    },
    setCanicLockedBalance(cani){
        this.canic_locked = cani
    },
    setLoginState(status){
        this.isLogged = status
    },
    setICPPrice(price){
        this.icpPrice = price
    },
    setCanicListing(canic){
        this.caniListing = canic
    },
    setCanicCreating(canic){
        this.canicCreating = canic
    },
    setCurrentAccount(account){
        this.account = account;
        localStorage.setItem('_current_account', JSON.stringify(account));//Save for Reload check
        axios.defaults.headers.common['Wallet-Address'] = walletData?.account?.address; // Set header for all requests
    },
    setCurrentAccountIdx(current){
        this.currentAccount = current
    },
    setAccountStatus(status){
        this.account_verified = status;
    },
    setModalVisible(status){
        this.isModalVisible = status;
    },
    setCanisterPrice(price){
        this.canisterPrice = price;
    },
    setCanisterLimit(limit){
        this.canisterLimit = limit;
    },
    async getBalance() {
        if(this?.account?.address){
            console.log('get balance')
            await rosettaApi.getAccountBalance(this.account.address).then(b =>{
                this.balance = Number(b);
            })
            await WalletManager.getCycleBalance();
            await WalletManager.getCycleRate();
        }
    },
    async getStakingBalance() {
        if(this?.account?.address) {
            // this.stakingBalance = await _apiHandler.getStakingBalance(this.account.address);
        }
    },
    async getXcanicBalance() {
        if(this.principal) {
            // let xcanicBalance = await _apiHandler.getXcanicBalance(this.principal.getPrincipal());
            // this.xcanicBalance = Number(xcanicBalance);
        }
    },
    async getWalletData(){
        if(this?.account?.address) {

        }
    },
    async getRateICP(){
        if (!this.lastUpdate || ((Date.now()-this.lastUpdate) > (10*60*1000))) {
            this.lastUpdate = Date.now();
            const icpPrice = await axios.get(
                "https://api.coinbase.com/v2/prices/ICP-USD/buy"
            ).then((res) => {
                    console.log('res.data:', res.data.data.amount)
                    this.icpPrice = res.data.data.amount;
                })
            //
            // const icpXdrPrice = await axios.get(
            //     "https://ic-api.internetcomputer.org/api/v3/icp-xdr-conversion-rates"
            // )
            //     .then((res) => {
            //         console.log(res.data);
            //         console.log('xdr', res.data.icp_xdr_conversion_rates[0][1] / 10000)
            //     });
            //
            // this.icpRate = icpPrice / icpXdrPrice;
            //
            // axios.get(config.backend_api+'get_icp_rate').then(r => {
            //     // this.icpRate = Number(r.data.price);
            //     this.icpRate = r.data.price;
            //     // console.log(this.lastUpdate, ' - Get Rate:', r.data.price)
            // }).catch(Err =>{
            //     console.log('Network Error: ', Err)
            // });
        }
    },
})