import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import {BASE_API, BASE_BACKEND_URL, cartIDkey, etoken, PRODUCTS_NUM} from "@/constants/constants";

export default {
    setSpinnerLoading({commit}, status) {
        commit('SET_SPINNER_LOADING', status);
    },
    setStatusSearch({commit}, query) {
        commit('SET_STATUS_SEARCH', query);
    },
    emptyProducts({commit}) {
        commit('EMPTY_PRODUCTS');
    },
    emptySearchProducts({commit}) {
        commit('EMPTY_PRODUCTS_SEARCH');
    },
    emptyWishProducts({commit}) {
        commit('EMPTY_WISH_PRODUCTS');
    },
    async getProducts({commit, dispatch}, params) {
        if (this.loading) {
            return;
        }
        //console.log("params", params);
        dispatch("setSpinnerLoading", true);
        this.loading = true; // Imposta il flag loading su true per evitare chiamate concorrenti
        try {
           // console.log("params.idsCategory in getProducts:", params);
            let {data} = await axios.post(BASE_API + "products", {
                "start": params.start,
                "limit": PRODUCTS_NUM,
                "type": "website",
                "description": params.query,
                "idsProduct": params.idsProduct || [],
                "idsCategory": params.idsCategory || [],
                "slugsCategory": params.slugsCategory || [],
                "tags": params.tags || [],
                "filterOptions" : params.filterOptions || [],
                "minprice": params.minprice,
                "maxprice": params.maxprice,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'e-token': etoken
                }
            });

            if (params.query && params.query !== "") {
                commit('SET_PRODUCTS_SEARCH', data);
            } else if (params.idsProduct) {
                commit('SET_PRODUCTS_WISH', data);
            } else {
                //console.log("DATA mutations", data);
                commit('SET_PRODUCTS', data);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API:", error);
        } finally {
            this.loading = false; // Resetta il flag loading
            dispatch("setSpinnerLoading", false);
        }
    },
    async getTags({ commit }) {
        try {
            const response = await axios.post(BASE_API + "tags",{}, {
                headers: {
                    'Content-Type': 'application/json',
                    'e-token': etoken
                }
            });
            commit("SET_TAGS", response.data.tags);
        } catch (error) {
            console.error("Errore nel recupero dei tags:", error);
        }
    },
    async getOptions({ commit }) {
        try {
            const response = await axios.post(BASE_API + "options",{}, {
                headers: {
                    'Content-Type': 'application/json',
                    'e-token': etoken
                }
            });
            commit("SET_OPTIONS", response.data.options);
        } catch (error) {
            console.error("Errore nel recupero delle options:", error);
        }
    },
    async getCategories({commit}) {
        try {
            let {data} = await axios.get(BASE_API + "categories?start=0&limit=100&type=website",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'e-token': etoken
                    }
                }
            );
            commit("SET_CATEGORIES", data.categories);
        } catch (error) {
            console.log(error);
        }
    },
    async getProfile({commit}) {
        let token = localStorage.getItem("token");
        try {
            let {data} = await axios.get(BASE_API + "user",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'e-token': etoken,
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            //console.log(data);
            commit("SET_PROFILE", data);
        } catch (error) {
            console.log(error);
        }
    },
    async editProfile({commit}, newProfile) {
        //console.log("newProfile", newProfile)
        try {
            commit('showSpinner');
            let config = {};
            let token = localStorage.getItem("token");
            if (token) {
                //idcart = null;
                config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
            }
            await axios.patch("editprofile", {
                    name: newProfile.name,
                    email: newProfile.email,
                    surname: newProfile.surname,
                    address: newProfile.address,
                    numciv: newProfile.numciv,
                    cap: newProfile.cap,
                    city: newProfile.city,
                    prov: newProfile.prov,
                    phone: newProfile.phone,
                    country: newProfile.country
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'e-token': etoken,
                        Authorization: `Bearer ${token}`
                    }
                },
                config
            ).then((res) => {
                Swal.fire({
                    title: "Dati modificati con successo",
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#e20036",
                });
            }).catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Errore nel salvataggio dei dati",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#e20036",
                });
            });
            commit('hideSpinner');
        } catch (error) {
            commit('hideSpinner');
            console.log(error);
        }
    },
    async addToCart({commit}, cart) {
        try {
            commit('showSpinner');
            let idcart = localStorage.getItem(cartIDkey);
            let config = {};
            let token = localStorage.getItem("token");
            if (token) {
                //idcart = null;
                config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
            }
            let res = await axios.post("addtocart", {
                    idcart: idcart,
                    idproduct: cart.idproduct,
                    qnt: cart.qnt,
                    productType: cart.type,
                    subproducts: cart.subproducts,
                    gift: cart.gift,
                    idvariant: cart.idvariant
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'e-token': etoken
                    }
                }, config);
            commit('SET_CART_ID', res.data.cart);
            commit('SET_TOTAL_PRODSCART', res.data.totalProdsCart);
            commit('hideSpinner');
            Swal.fire({
                showCancelButton: true,
                title: 'Prodotto aggiunto al carrello',
                icon: 'success',
                iconColor: '#000',
                confirmButtonText: 'Vai al carrello',
                cancelButtonText: "Continua con lo shopping",
                confirmButtonColor: '#e20036',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/cart');
                } else if (result.isDismissed) {
                    router.push('/');
                }
            });
        } catch (error) {
            commit('hideSpinner');
            console.log(error);
        }
    },
    async Logout({commit}) {
        let token = localStorage.getItem("token");
        await axios.get('logout', {
            headers: {
                Authorization: `Bearer ${token}`,
                'e-token': etoken
            }
        }).then((res) => {
            //console.log(res);
            //faccio logout a prescindere
            localStorage.removeItem('token');
            localStorage.removeItem('refreshtoken');
            localStorage.removeItem("expires");
            localStorage.removeItem("user");
            commit("SET_AUTH", false);
            router.push('/login');
        }).catch((error) => {
            console.log(error);
        });
    },

    //TODO: CMS
    async fetchMenus({commit}) {
        try {
            const response = await axios.get(
                BASE_BACKEND_URL + 'api/cms/v1/menus',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'e-token': etoken
                    }
                }
            );
            // console.log('menus', response.data.menus);
            commit("SET_MENUS", response.data.menus)
            //this.menus = response.data.menus;
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    },
    //serve per prendere gli hooks e settare l'immagine della home
    async components({commit}, isLoadingImage) {
        try {
            const response = await axios.get(BASE_BACKEND_URL + 'api/cms/v1/components',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'e-token': etoken
                    }
                });
            // Filtra per componenti senza pagine associate
            commit("SET_PAGEDATA", response.data.components.filter(component => !component.title && !component.slug));
            //commit("SET_LOADING_IMAGE", isLoadingImage); // Imposta isLoadingImage a false l'immagine è stata caricata
        } catch (error) {
            console.error(error);
        }
    },
    //CMS
}