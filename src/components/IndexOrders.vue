<template>
  <div class="wrapper">
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-between align-items-center mb-3 mt-5">
            <h4 class="widget-title">Ordini</h4>
          </div>
      </div>
      <div class="table-responsive" v-if="orders.length">
        <table class="table">
          <thead class="bg-dark text-white">
          <tr>
            <th>Ordine</th>
            <th>Stato</th>
            <th>Pagamento</th>
            <th>Totale</th>
            <th>Azioni</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders">
            <td class="align-middle">#{{ order.idorder }}</td>
            <td class="align-middle">
              <span class="badge bg-warning p-2">{{ order.status }}</span>
            </td>
            <td class="align-middle">
            <span class="badge bg-dark p-2">
              <template v-if="order.payment.type === 'braintree'">Carta di credito</template>
              <template v-if="order.payment.type === 'paypal'">PayPal</template>
              <template v-if="order.payment.type === 'cod'">Contrassegno</template>
              <template v-if="order.payment.type === 'stripe'">Carta di credito</template>
              <template v-if="order.payment.type === 'bank'">Bonifico</template>
            </span>
            </td>
            <td class="align-middle">{{ formatPrice(order.total) }} €</td>
            <td class="align-middle d-flex flex-row">
              <router-link :to="'/orderdetails/' + order.idorder" class="btn btn-sm btn-brand mb-2">Dettaglio</router-link>
              <router-link :to="'/checkout/' + order.idorder" class="btn btn-sm btn-brand mb-2" v-if="order.status === 'pending' && order.payment.type !== 'cod'">Paga</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="alert alert-info mb-5" v-else>
        Non ci sono ordini
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {etoken} from "@/constants/constants.js";

export default {
  name: "CheckoutForm",
  data() {
    return {
      orders: []
    }
  },
  async beforeMount() {
    this.$store.commit('showSpinner');
    let token = localStorage.getItem("token");
    await axios.get("orders", {
      headers: {Authorization: `Bearer ${token}`, 'e-token': etoken}
    }).then((resp) => {
      this.$store.commit('hideSpinner');
      this.orders = resp.data.orders;
    }).catch((error) => {
      this.$store.commit('hideSpinner');
      console.log(error);
    });
  },
  methods: {
    formatPrice(value) {
      return Number(value).toFixed(2).replace(".", ",");
    },
  }
}
</script>

<style scoped>

.btn {
  display: inline-block;
  margin-right: 5px;
}

/* Stili per i pulsanti */
.btn-brand {
  color: white;
  background-color: #f0c57a;
  border-radius: 10px;
  border-color: #f0c57a;
  padding: 10px 30px !important;
  margin-top: 20px;
}

.btn-brand:hover {
  color: black;
  background-color: white !important;
  border-radius: 10px;
  border-color: #f0c57a !important;
  padding: 10px 30px !important;
}
</style>