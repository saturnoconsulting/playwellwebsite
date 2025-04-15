import { createApp } from 'vue'
import App from './App.vue'
import './interceptors/axios'
import router from "./router"
import store from "./store"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faBars, faRemove, faShoppingBag, faSearch,
    faHeart as faHeartS, faEye, faEyeSlash, faTruck, faBagShopping, faShield, faUmbrella} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

library.add(faAngleUp, faBars, faRemove, faShoppingBag, faHeart, faHeartS, faSearch, faEye, faEyeSlash, faTruck, faBagShopping, faShield, faUmbrella);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).use(BootstrapVue3).mount('#app');