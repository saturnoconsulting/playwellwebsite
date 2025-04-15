<template xmlns="http://www.w3.org/1999/html">
  <section class="page_wrapper">
    <div class="container shopping cart" v-if="cart?.lineItems?.length">
      <div class="row">
        <div class="col-lg-12">
          <h4 class="widget-title">Carrello</h4>
        </div>
      </div>
      <div class="row mt-5" v-for="lineItem in cart?.lineItems" :key="lineItem?.id">
        <div class="col-lg-2 mb-4 col-3">
          <router-link :to="'/product/' + lineItem.product.slug">
            <img v-if="lineItem.product.image" :src="lineItem.product.image" class="img-fluid cart-image mb-3" alt="Generic placeholder image">
            <img v-else :src="'/images/placeholder.jpg'" alt="" class="img-fluid cart-image mb-3"/>
          </router-link>
        </div>
        <div class="col-lg-3 mb-4 col-9">
          <div>
            <p class="small heading-cart"><b>Nome</b></p>
            <p class="lead fw-normal mb-0">
              <router-link class="link" :to="'/product/' + lineItem.product.slug">{{ lineItem.product?.name }}</router-link>
              <template v-for="sub in lineItem.subproducts">
                <small>{{ sub.name }}</small><br>
              </template>
              <small v-if="lineItem.gift"><b>Confezione regalo: € 2,00</b></small>
            </p>
          </div>
        </div>
        <div class="col-lg-1 mb-4 col-6">
          <div>
            <p class="small heading-cart"><b>Quantità</b></p>
            <p class="lead small mb-0">{{ lineItem.qnt }}</p>
          </div>
        </div>
        <div class="col-lg-2 mb-4 col-6">
          <div>
            <p class="small heading-cart"><b>Prezzo</b></p>
            <p class="lead fw-normal mb-0" v-if="lineItem.product?.discountPrice">€<del>{{this.formatPrice(lineItem.product?.unitPrice)}}</del> €{{ this.formatPrice(lineItem.product?.discountPrice) }}</p>
            <p class="lead fw-normal mb-0" v-else>€{{this.formatPrice(lineItem.product?.unitPrice)}}</p>
          </div>
        </div>
        <div class="col-lg-2 mb-4 col-6">
          <div>
            <p class="small heading-cart"><b>Totale</b></p>
            <p class="lead fw-normal  mb-0" v-if="lineItem.product?.discountPrice">€ {{ this.formatPrice(lineItem.qnt * lineItem.product?.discountPrice) }} </p>
            <p class="lead fw-normal  mb-0" v-else>€ {{ this.formatPrice(lineItem.qnt * lineItem.product?.unitPrice) }}</p>
          </div>
        </div>
        <div class="col-lg-2 mb-4 col-6">
          <div>
            <p class="small heading-cart"><b>Azioni</b></p>
            <button class="btn btn-brand-remove p-0" v-on:click="removeFromCart(lineItem.idProduct, lineItem.subproducts)">Rimuovi
            </button>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="d-flex justify-content-between">
          <h5>Subtotale</h5>
          <h5>€ {{ this.formatPrice(this.cart?.totals?.subtotal) }}</h5>
        </div>
        <div class="d-flex justify-content-between">
          <h4>TOTALE</h4>
          <h4>€ {{ this.formatPrice(this.cart?.totals?.total) }}</h4>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-lg-12 text-center mt-3">
          <router-link to="/checkout" class="btn btn-brand"><b>Checkout</b></router-link>
          <br>
        </div>
        <div class="col-lg-12 text-center mt-3">
          <button type="button" class="btn-empty-cart" v-on:click="this.emptyCart()"><b>Svuota carrello</b></button>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-lg-12 text-center">
          <h4>Il tuo carrello è vuoto!</h4>
          <br>
          <router-link to="/" class="btn btn-brand">Torna a fare shopping!</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import {BASE_API, cartIDkey, etoken, IDSALESPOINT} from "@/constants/constants";

export default {
  name: "Cart",
  data() {
    return {
      idcart: localStorage.getItem(cartIDkey),
      cart: [],
      //base: PATH_APP
    }
  },
  mounted() {
    this.getCart();
  },
  methods: {
    formatPrice(value) {
      return Number(value / 100)
          .toFixed(2)
          .replace(".", ",");
    },
    async getCart() {
      this.$store.commit('showSpinner');
      let idcart = localStorage.getItem(cartIDkey);
      let token = localStorage.getItem("token");
      await axios.get(BASE_API + "cart?type=website&idcart=" + idcart + "&idsalespoint=" + IDSALESPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'e-token': etoken
        }
      }).then((resp) => {
        this.$store.commit('hideSpinner');
        this.cart = resp.data.cart;
        if (!localStorage.getItem(cartIDkey)) {
          localStorage.setItem(cartIDkey, resp.data.cart.id);
        }
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        if (error.response.status === 404) {
          localStorage.removeItem(cartIDkey);
        } else {
          console.log(error);
        }
      });
    },
    async removeFromCart(idprod, subproducts) {
      let idcart = localStorage.getItem(cartIDkey);
      let token = localStorage.getItem("token");
      await axios.delete(BASE_API + "removefromcart", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'e-token': etoken
        },
        data: {
          idcart: idcart,
          idProduct: idprod,
          // subproducts: subproducts
        }
      }).then((resp) => {
        this.cart = resp.data.cart;
        this.$store.commit('SET_TOTAL_PRODSCART', resp.data.totalProdsCart);
      }).catch((error) => {
        console.log(error);
      });
    },
    async emptyCart() {
      let idcart = localStorage.getItem(cartIDkey);
      let token = localStorage.getItem("token");
      await axios.delete(BASE_API + "emptycart?idcart=" + idcart, {
        headers: {Authorization: `Bearer ${token}`, 'e-token': etoken}
      }).then((resp) => {
        this.cart = null;
        this.idcart = null;
        this.$store.commit('SET_TOTAL_PRODSCART', 0);
        localStorage.removeItem(cartIDkey);
      }).catch((error) => {
        this.$store.commit('SET_TOTAL_PRODSCART', 0);
        localStorage.removeItem(cartIDkey);
        console.log(error);
      });
    }
  },
}
</script>

<style scoped>
b{
  color: black;
}
/* Stili per i pulsanti */
.btn-brand {
  color: white !important;
  background-color: #f0c57a;
  border-radius: 10px;
  border-color: #f0c57a;
  padding: 20px 40px !important;
  margin-top: 20px;
}

.btn-brand:hover {
  color: black !important;
  background-color: white !important;
  border-radius: 10px;
  border-color: #f0c57a;
  padding: 20px 40px !important;
}

.small {
  width: 80px;
}
p{
  color: black;
}
.btn-empty-cart {
  font-size: 12px;
  text-decoration: none;
  color: #dedede;
  background-color: transparent;
  border: none;
}

.btn-empty-cart:hover {
  color: #e20036;
}

.cart-image{
  border: 1px solid #dedede;
  padding: 10px;
}

@media (max-width: 992px) {
  .heading-cart {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
}
</style>