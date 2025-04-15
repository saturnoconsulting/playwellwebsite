import {createRouter, createWebHistory} from 'vue-router';

import store from "@/store";

import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import RecoverPassword from "@/views/RecoverPassword.vue";
import newPassword from "@/views/NewPassword.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Cart from "@/views/Cart.vue";
import NotFound from "@/views/NotFound.vue";
import Favourites from "@/views/Favourites.vue";
import Checkout from "@/views/Checkout.vue";
import CheckoutPayment from "@/views/CheckoutPayment.vue";
import UserArea from "@/views/UserArea.vue";
import OrderDetails from "@/views/OrderDetails.vue";
import indexOrders from "@/components/IndexOrders.vue";
import Search from "@/views/Search.vue";
import CategoryProducts from "@/views/CategoryProducts.vue";
import Message from "@/views/Message.vue";


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta : {
            auth : false,
            title : "Login - Playwell Shop",
            description : "Accedi alla tua area personale per gestire ordini e preferiti."
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta : {
            auth : false,
            title : "Registrazione - Playwell Shop",
            description : "Registrati ora per creare il tuo account e scoprire offerte esclusive."
        }
    },
    {
        path: '/recover',
        name: 'RecoverPassword',
        component: RecoverPassword,
        meta : {
            auth : true,
            title : "Password recovery | Not just a brand",
            description : "Official website of Bikini Lovers, not just a brand"
        }
    },
    {
        path: '/website/recover/:token',
        name: 'NewPassword',
        component: newPassword,
        meta : {
            auth : false,
            title : "New password | Not just a brand",
            description : "Official website of Bikini Lovers, not just a brand"
        }
    },
    {
        path: '/recover',
        name: 'RecoverPassword',
        component: RecoverPassword,
        meta : {
            auth : false,
            title : "Recover | Not just a brand",
            description : "Official website of Bikini Lovers, not just a brand"
        }
    },
    {
        path: '/product/:slug',
        name: 'ProductDetails',
        component: ProductDetails,
        meta : {
            auth : false,
            title : "Prodotto - Playwell Shop",
            description : "Scopri il prodotto in dettaglio."
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta : {
            auth : false,
            title : "Carrello - Playwell Shop",
            description : "Controlla e modifica gli articoli nel tuo carrello prima del pagamento."
        }
    },
    {
        path: '/favourites',
        name: 'Favourites',
        component: Favourites,
        meta : {
            auth : false,
            title : "Favoriti - Playwell Shop",
            description : "Rivedi i tuoi articoli preferiti e aggiungili al carrello."
        }
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        meta : {
            auth : false,
            title : "Checkout - Playwell Shop",
            description : "Completa l'acquisto in pochi passi e ricevi il tuo ordine velocemente."
        }
    },
    {
        path: '/message/:mex',
        name: 'Message',
        component: Message,
        meta : {
            auth : false,
            title : "Messaggio - Playwell Shop",
            description : "Messaggio - Playwell Shop"
        }
    },
    {
        path: '/checkout/:idorder',
        name: 'Payment',
        component: CheckoutPayment,
        meta : {
            auth : true,
            title : "Pagamento - Playwell Shop",
            description : "Procedi con il pagamento in modo sicuro e veloce."
        }
    },
    {
        path: '/userarea',
        name: 'UserArea',
        component: UserArea,
        meta : {
            auth : true,
            title : "Area riservata - Playwell Shop",
            description : "Accedi alla tua area riservata per gestire ordini, preferiti e informazioni personali."
        }
    },
    {
        path: '/orderdetails/:idorder',
        name: 'OrderDetails',
        component: OrderDetails,
        meta : {
            auth : true,
            title : "Dettagli ordine - Playwell Shop",
            description : "Controlla i dettagli e lo stato del tuo ordine."
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: indexOrders,
        meta : {
            auth : true,
            title : "Ordini - Playwell Shop",
            description : "Consulta i tuoi ordini passati e aggiorna le tue informazioni."
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta : {
            auth : false,
            title : "Cerca - Playwell Shop",
            description : "Trova facilmente i prodotti che desideri su Playwell Shop."
        }
    },
    {
        path: '/category/:slugCategory',  // Utilizziamo un parametro dinamico per l'ID della categoria
        name: 'CategoryPage',
        component: CategoryProducts,
        meta : {
            auth : false,
            title : "Categoria - Playwell Shop",
            description : "Esplora la nostra selezione di prodotti in questa categoria."
        }
    },
    {
        path: '/tag/:tag',  // Utilizziamo un parametro dinamico per il tag
        name: 'TagPage',
        component: CategoryProducts,
        meta : {
            auth : false,
            title : "Tag - Playwell Shop",
            description : "Esplora la nostra selezione di prodotti con questo tag."
        }
    },
    {
        path: '/:pathMatch(.+)', //alternativa '/:pathMatch(.*[^/])'
        name: "not-found",
        component: NotFound,
        meta : {
            auth : false,
            title : "Not found",
            description : "Not found"
        }
    }
];
//history: createWebHistory('/newsite/'),
//base: '/newsite/',

const router = new createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to,from, savedPosition) {
        if (to.name !== "CategoryPage" && to.name !== "TagPage") {
            return {top: 0};
        }else if(savedPosition){
            return savedPosition
        }
    }
});

router.beforeEach((to, from, next) => {
    store.getters.manageAuth;
    if(to.meta.title !== undefined) {
        document.title = to.meta.title;
        document.querySelector('meta[name="description"]').setAttribute("content", to.meta.description);
    } if(to.meta.auth && !store.getters.getAuth){
        //this.$store.dispatch("Logout");
        next('/login');
    } else {
        next();
    }
});

export default router;