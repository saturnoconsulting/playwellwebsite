<template>
  <div id="dropin-container"></div>
  <button class="btn btn-brand btn-sm" v-on:click="sendPayment">Pay now</button>
</template>

<script>
import router from "@/router";
import axios from "axios";
import dropin from "braintree-web-drop-in";
import Swal from "sweetalert2";
import {cartIDkey, etoken} from "@/constants/constants.js";

export default {
  name: "BraintreePayment",
  data() {
    return {
      dropinInstance : null,
      idorder : this.$route.params.idorder,
      order : null,
      tokenBraintree : null,
      deviceData : null,
      errors : []
    }
  },
  beforeMount(){
    this.$store.commit('showSpinner');
    let token = localStorage.getItem("token");
    axios.get("tokenbraintree?idorder=" + this.idorder,{
      headers: { Authorization: `Bearer ${token}` , 'e-token': etoken}
    }).then(resp => {
      this.tokenBraintree = resp.data.tokenBraintree;
      this.order = resp.data.order;
      dropin.create({
        authorization: this.tokenBraintree,
        container: document.getElementById('dropin-container'),
        threeDSecure: true
      },(createErr, dropinInstance) => {
        if(createErr) {
          this.$store.commit('hideSpinner');
          console.log(createErr);
        }else {
          this.dropinInstance = dropinInstance;
          this.$store.commit('hideSpinner');
        }
      });
    }).catch((error) => {
      this.$store.commit('hideSpinner');
      console.log(error);
      router.push("/message/5");
    });
  },
  methods: {
    async sendPayment(){
      let token = localStorage.getItem("token");
      let threeDSecureParameters = {
        amount: this.order.total,
        email: this.order.user.email,
        billingAddress: {
          givenName: this.order.name, // ASCII-printable characters required, else will throw a validation error
          surname: this.order.surname, // ASCII-printable characters required, else will throw a validation error
          phoneNumber: this.order.phone,
          streetAddress: this.order.address,
          extendedAddress: null,
          locality: this.order.city,
          region: this.order.prov, // ISO-3166-2 code
          postalCode: this.order.cap,
          countryCodeAlpha2: "CA"
        },
        additionalInformation: {
          workPhoneNumber: this.order.user.phone,
          shippingGivenName: this.order.name,
          shippingSurname: this.order.surname,
          shippingPhone: this.order.phone,
          shippingAddress: {
            streetAddress: this.order.address,
            extendedAddress: this.order.numciv,
            locality: this.order.city,
            region: this.order.prov, // ISO-3166-2 code
            postalCode: this.order.cap,
            countryCodeAlpha2: "CA"
          }
        },
      };
      await this.dropinInstance.requestPaymentMethod({threeDSecure: threeDSecureParameters},
        (err, payload) => {
        if(!err && payload.nonce) {
          this.$store.commit('showSpinner');
          axios.post("noncebraintree", {
            idorder: this.idorder,
            paymentMethodToken : this.tokenBraintree,
            paymentMethodNonce: payload.nonce,
            threeDSecureAuthenticationId : payload.threeDSecureInfo.threeDSecureAuthenticationId,
            deviceData: null
          }, {
            headers: {Authorization: `Bearer ${token}`, 'e-token': etoken}
          }).then(resp => {
            if (resp.data.success) {
              //svuoto il carrello se il pagamento è andato a buon fine
              let idcart = localStorage.getItem(cartIDkey);
              let token = localStorage.getItem("token");
              axios.delete("emptycart?idcart=" + idcart, {
                headers: {Authorization: `Bearer ${token}`}
              }).then(resp => {
                this.$store.commit('SET_TOTAL_PRODSCART', 0);
                localStorage.removeItem(cartIDkey);
              }).catch((error) => {
                this.$store.commit('SET_TOTAL_PRODSCART', 0);
                localStorage.removeItem(cartIDkey);
              });
              this.$store.commit('hideSpinner');
              router.push("/message/1");
            } else {
              this.$store.commit('hideSpinner');
              router.push("/message/2");
              //console.log(resp.data.results);
            }
          }).catch((error) => {
            this.$store.commit('hideSpinner');
            console.log(error);
            router.push("/message/5");
          });
        }else{
          console.log(err);
          Swal.fire({
            title: "Check data for card",
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#e20036',
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.braintree-card label{
  width: 100% !important;
}
</style>