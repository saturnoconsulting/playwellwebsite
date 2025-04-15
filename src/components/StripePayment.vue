<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <form id="payment-form" @submit.prevent="payWithCard">
            <p class="title mt-4">INFORMAZIONI DI PAGAMENTO</p>
            <div class="row form-group">
              <div class="col-md-6">
                <label for="name" class="form-control-label mt-3 text-bigger">Titolare della carta</label>
                <input type="text" name="name" id="name" class="form-control" autocomplete="off" required>
              </div>
              <div class="col-md-6">
                <label for="email" class="form-control-label mt-3 text-bigger">E-mail</label>
                <input type="email" name="email" id="email" class="form-control" autocomplete="off" required>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-12">
                <!-- Display errors returned by createToken -->
                <label class="form-control-label mt-2 text-bigger">Dati carta</label>
                <div id="card_number" class="field form-control"></div>
                <div id="card-error" class="text-danger font-italic"></div>
                <br>
                <template v-if="errors.length > 0">
                  <div class="alert alert-danger" v-for="error in errors">
                    {{ error }}
                  </div>
                </template>
              </div>
            </div>
            <br>
            <div class="row form-group">
              <div class="col-md-12">
                <div class="form-check-inline custom-control custom-checkbox">
                  <input type="checkbox" name="terms_conditions" id="terms_conditions" class="custom-control-input" required>
                  <label for="terms_conditions" class="custom-control-label text">
                    Accetto i
                    <a class="text text-success" href="#" target="_blank">termini e le condizioni</a>
                  </label>
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-12">
                <div class="text-danger font-italic generic-errors"></div>
              </div>
            </div>
            <button type="submit" class="primary-btn mb-4 btn-brand">PAGA ORA</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import {cartIDkey, etoken, STRIPE_PUBLIC_KEY} from "@/constants/constants";
import router from "@/router";

export default {
  name: "StripePayment",
  data() {
    return {
      billing: {
        cardnumber: '',
        expiry: '',
        cvc: ''
      },
      errors: [],
      stripe: null,
      elements: null,
      card: null,
      stripeToken: '',
    }
  },
  methods: {
    payWithCard() {
      let name =  document.querySelector("#name").value;
      let email = document.querySelector("#email").value;
      this.stripe.confirmCardPayment(this.stripeToken, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: name,
            email: email
          }
        },
        receipt_email: email
      }).then((result) => {
        if (result.error) {
          // Show error to your customer
          //loading(false);
          this.errors = [];
          this.errors.push(result.error.message);
          console.log(result.error);
        } else {
          // The payment succeeded!
          if (result.paymentIntent.client_secret === this.stripeToken && result.paymentIntent.status === "succeeded") {
            this.emptyCart();
            router.push("/message/4");
          } else {
            router.push("/message/5");
          }
        }
      });
    },
    async emptyCart() {
      let idcart = localStorage.getItem(cartIDkey);
      if (idcart !== null) {
        let token = localStorage.getItem("token");
        await axios.delete("emptycart", {
          headers: {Authorization: `Bearer ${token}`,'e-token': etoken},
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
      let idorder = this.$route.params.idorder;
      let token = localStorage.getItem("token");
      await axios.get("checkout/" + idorder, {
        headers: {
          'e-token': etoken,
          Authorization: `Bearer ${token}`,
        }
      }).then((res) => {
        this.stripeToken = res.data.clientSecret;
      });
      this.stripe = Stripe(STRIPE_PUBLIC_KEY);
      this.elements = this.stripe.elements();
      this.card = this.elements.create("card", {
        hidePostalCode: true
      });
      this.card.mount("#card_number");
    },
  },
  mounted() {
    this.getToken();
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