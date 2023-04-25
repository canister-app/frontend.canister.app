import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION, TYPE  } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const app = createApp(App)
const toastOptions = {
    position: POSITION.BOTTOM_RIGHT,
    toastDefaults: {
        // ToastOptions object for each type of toast
        [TYPE.ERROR]: {
            timeout: 10000,
            closeButton: false,
            hideProgressBar: true,
        },
        [TYPE.SUCCESS]: {
            timeout: 3000,
            hideProgressBar: true,
        },
        [TYPE.INFO]: {
            timeout: 3000,
            hideProgressBar: true,
        }
    }
};

app.use(Toast, toastOptions)
app.use(router)
app.mount('#app')
