import Vuex from "vuex";
import getters from '@/services/getters';
import mutations from '@/services/mutations';
import actions from '@/services/actions';

export default new Vuex.Store({
    state: {
        auth : false,
        //spinner generale
        spinner: true,
        //spinner caricamento prodotti
        spinnerLoading: false,
        start : 0,
        totalproducts : 0,
        products: [],
        totalProdsCart : 0,
        //cerca
        query : null,
        searchStart : 0,
        searchProducts : [],
        searchTotalProducts : 0,
        //wishlist
        wishStart : 0,
        wishProducts : [],
        wishTotalProducts : 0,
        categories: [],
        filterCategory: null ,//filter by category
        filterTag: null,//filter by tag
        //State CMS
        menus: [],
        pageData: [],
        profile:[],
        idsCat:[],
        tags:[],
        options:[]
    },
    getters,
    mutations,
    actions,
    modules: {}
});
