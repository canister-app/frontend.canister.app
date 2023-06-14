import EventBus from "./EventBus";
export default {
    showDeposit: (status)=>{
        EventBus.emit('showDepositModal', {status: status})
    },
    showDeployModal: (obj)=>{
        EventBus.emit('showDeployModal', obj)
    },
    showCardModal: (obj)=>{
        EventBus.emit('showCardModal', obj)
    },
    showImageModal: (obj)=>{
        EventBus.emit('showImageModal', obj)
    },
}