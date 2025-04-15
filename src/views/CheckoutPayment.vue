<template>
  <div class="page_wrapper">
    <div class="container shopping">
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex justify-content-center mt-5">
            <div class="spinner spinner-border" role="status" v-if="spinner">
              <span class="visually-hidden"></span>
            </div>
          </div>
          <!--BraintreePayment v-if="paymentType === 'braintree'"/-->
          <template v-if="paymentType === 'stripe'">
          <h4 class="widget-title">Payment details</h4>
          <StripePayment />
          </template>
          <template v-else>
          <BankPayment v-if="paymentType === 'bank'"/>
          </template>
          <PaypalPayment v-if="paymentType === 'paypal'" :order="this.order"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import BraintreePayment from "@/components/BraintreePayment.vue";
import PaypalPayment from "@/components/PaypalPayment.vue";
import {etoken} from "@/constants/constants.js";
import StripePayment from "@/components/StripePayment.vue";
import BankPayment from "@/components/BankPayment.vue";
import {BASE_API} from "@/constants/constants.js";


export default {
  name: "CheckoutPayment",
  components : {
    BankPayment,
    StripePayment,
    BraintreePayment,
    PaypalPayment
  },
  data() {
    return {
      idorder : this.$route.params.idorder,
      paymentType: null,
      order : {}
    }
  },
  beforeMount(){
    //verifico che l'ordine non sia già stato pagato
    this.getOrder();
  },
  computed:{
    spinner() {
      return this.$store.getters.getStatusSpinner;
    },
  },
  methods:{
    async getOrder(){
      this.$store.commit('showSpinner');
      let token = localStorage.getItem("token");
      await axios.get(BASE_API + "orders/" + this.idorder,{
        headers: { Authorization: `Bearer ${token}`, 'e-token': etoken }
      }).then((resp) => {
        this.$store.commit('hideSpinner');
        if(resp.data.order.type === 'website') {
          if (resp.data.order.status === 'pending') {
              this.paymentType = resp.data.order.payment.type;
              this.order = resp.data.order;
          }else{
            if(resp.data.order.payment.type === "cod"){
              router.push("/message/7");
            }else {
              router.push("/message/6");
            }
          }
        }else{
          router.push("/");
        }
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        console.log(error);
        router.push("/");
      });
    }
  }
}
</script>

<style scoped>

</style>