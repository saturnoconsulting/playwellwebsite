<template>
<div class="d-flex justify-content-center mt-5 mb-5">
            <div class="spinner spinner-border" role="status" v-if="spinnerLoading">
              <span class="visually-hidden"></span>
            </div>
          </div>
</template>

<script>
import axios from "axios";
import {cartIDkey, etoken} from "@/constants/constants";
import router from "@/router/index.js";

export default {
  name: "BankPayment",
  data() {
    return {
      errors: [],
    }
  },
  computed:{
    spinnerLoading() {
      return this.$store.getters.getStatusSpinnerLoading;
    },
  },
  methods: {
    async emptyCart() {
      let idcart = localStorage.getItem(cartIDkey);
      if (idcart !== null) {
        let token = localStorage.getItem("token");
        await axios.delete("emptycart", {
          headers: {Authorization: `Bearer ${token}`, 'e-token': etoken},
          data: {
            idCart: idcart,
          }
        }).then((resp) => {
          this.cart = resp.data.cart;
          this.$store.commit('SET_TOTAL_PRODSCART', resp.data.totalProdsCart);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    async getToken() {
      this.$store.commit('showSpinner');
      let idorder = this.$route.params.idorder;
      let token = localStorage.getItem("token");
      await axios.get("checkout/" + idorder, {
            headers: {
              'e-token': etoken,
              Authorization: `Bearer ${token}`,
            }
          }
      ).then(() => {
        this.$store.commit('hideSpinner');
        this.emptyCart();
        router.push("/message/7");
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        router.push("/message/2");
        console.log(error);
      });
    },
  },
  mounted() {
    this.$store.commit('showSpinner');
    this.getToken();
    this.$store.commit('hideSpinner');
  }
}
</script>

<style scoped>
.btn-brand {
  color: white;
  background-color: #ab2431;
  border-radius: 10px;
  border-color: #ab2431;
  padding: 20px 40px 20px 40px !important;
}

.btn-brand:hover {
  color: black;
  background-color: white;
  border-radius: 10px;
  border-color: #ab2431;
  padding: 20px 40px 20px 40px !important;
}

</style>