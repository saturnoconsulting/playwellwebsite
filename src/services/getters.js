import axios from "axios";

export default {
    getStatusSpinner: state => {
        return state.spinner;
    },
    getStatusSpinnerLoading: state => {
        return state.spinnerLoading;
    },
    getTags: state => {
        return state.tags;
    },
    getOptions: state => {
        return state.options;
    },
    getStatusStart: state => {
        return state.start;
    },
    getStatusSearch(state){
        return state.query;
    },
    getStatusStartSearch: state => {
        return state.searchStart;
    },
    getStatusStartWish: state => {
        return state.wishStart;
    },
    getStatusTotalProdsCart: state => {
        return state.totalProdsCart;
    },
    //prodotti home
    getStatusTotalProducts: (state) => {
        return state.totalproducts
    },
    //prodotti search
    getStatusSearchProducts: (state) => {
        return state.searchProducts
    },
    getStatusSearchTotalProducts: (state) => {
        return state.searchTotalProducts
    },
    //prodotti wish
    getStatusWishTotalProducts: (state) => {
        return state.wishTotalProducts
    },
    getStatusWishProducts: (state) => {
        return state.wishProducts
    },
    getStatusProducts: (state) => {
        return state.products
    },
    getCategories: (state) =>{
        return state.categories
    },
    getProfile: (state) =>{
        return state.profile
    },
    getFilterCategory: (state)=>{
        return state.filterCategory;
    },
    getAuth : (state) => {
        return state.auth;
    },
    manageAuth: async (state) => {
        let token = localStorage.getItem("token");
        let expires = localStorage.getItem("expires");
        let refreshtoken = localStorage.getItem("refreshtoken");
        if(token && expires && token.length > 0 && expires > Math.floor(Date.now() / 1000)) {
            state.auth = true;
        }else if(refreshtoken){
            //token scaduto
            await axios.get("refreshtoken?refreshtoken=" + refreshtoken).then(resp => {
                localStorage.setItem('expires', Math.floor(Date.now() / 1000) + resp.data.expires_in);
                localStorage.setItem("token",resp.data.token);
                localStorage.setItem("refreshtoken",resp.data.refreshtoken);
                localStorage.setItem("user",JSON.stringify(resp.data.user));
                state.auth = true;
            }).catch((error) => {
                localStorage.removeItem("expires");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshtoken");
                localStorage.removeItem("user");
                state.auth = false;
                console.log(error);
            });
        }else{
            //logout
            localStorage.removeItem("expires");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshtoken");
            localStorage.removeItem("user");
            state.auth = false;
        }
    }
}