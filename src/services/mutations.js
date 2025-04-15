import {cartIDkey, PRODUCTS_NUM} from "@/constants/constants";

export default{
    showSpinner(state) {
        state.spinner = true;
    },
    hideSpinner(state) {
        state.spinner = false;
    },
    SET_AUTH(state, auth){
        state.auth = auth;
    },
    SET_TAGS(state, tags){
        //console.log("tags commit",tags);
        state.tags = tags;
    },
    SET_OPTIONS(state, options){
        //console.log("tags commit",tags);
        state.options = options;
    },
    EMPTY_QUERY(state){
        state.query = null;
    },
    SET_QUERY(state, query){
        state.query = query;
    },
    SET_SPINNER_LOADING(state, status) {
        state.spinnerLoading = status;
    },
    EMPTY_PRODUCTS(state){
        state.start = 0;
        state.products = [];
        state.totalproducts = 0;
    },
    SET_STATUS_SEARCH(state, query){
        state.query = query;
    },
    EMPTY_PRODUCTS_SEARCH(state){
        state.searchStart = 0;
        state.searchProducts = [];
        state.searchTotalProducts = 0;
    },
    EMPTY_WISH_PRODUCTS(state){
        state.wishStart = 0;
        state.wishProducts = [];
        state.wishTotalProducts = 0;
    },
    SET_TOTAL_PRODSCART(state, num){
        state.totalProdsCart = num;
    },
    SET_PRODUCTS(state, data) {
        state.start += PRODUCTS_NUM;
        state.products = [...state.products, ...data.products];
        state.totalproducts = data.totalCount;
    },
    SET_PRODUCTS_SEARCH(state, data) {
        state.searchStart += PRODUCTS_NUM;
        state.searchProducts = [...state.searchProducts, ...data.products];
        state.searchTotalProducts = data.totalCount;
    },
    SET_PRODUCTS_WISH(state, data) {
        state.wishStart += PRODUCTS_NUM;
        state.wishProducts = [...state.wishProducts, ...data.products];
        state.wishTotalProducts = data.totalCount;
    },
    SET_CART_ID(state, cart) {
        //alert product added in cart
        if (!localStorage.getItem(cartIDkey)) {
            localStorage.setItem(cartIDkey, cart.id);
        }
    },
    SET_CATEGORIES(state,data){
        state.categories = data;
    },
    SET_PROFILE(state,data){
        state.profile = data;
    },
    SET_FILTER_CATEGORY(state, data){
        //console.log("data",data);
        state.filterCategory = data;
    },
    SET_FILTER_TAG(state, data){
        //console.log("data",data);
        state.filterTag = data;
    },
    //Mutations CMS
    SET_MENUS(state, data){
        state.menus = data;
    },
    //serve per prendere gli hooks e settare l'immagine della home
    SET_PAGEDATA(state, data){
        //console.log("data",data);
        state.pageData = data;
    },
}