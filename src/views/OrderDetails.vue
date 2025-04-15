<template>
  <section class="page_wrapper">
    <div class="container shopping">
      <div class="row">
        <div class="col-lg-12">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="widget-title">Dettaglio ordine</h4>
          </div>
          <table class="table table-borderless">
            <thead class="bg-dark text-white">
              <tr>
                <th>Immagine</th>
                <th>Descrizione</th>
                <th>Qnt</th>
                <th>Subtotale</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.details" :key="item.id">
                <td rowspan="3" class="thumbnail-detail" v-if="item.type === 'compound' && !item.idcompound">
                  <img class="img-fluid" :src="item.image || '/images/botte.png'">
                </td>
                <td class="thumbnail-detail" v-else-if="item.type === 'product' && !item.idcompound">
                  <img class="img-fluid" :src="item.image || '/images/botte.png'">
                </td>
                <template v-if="item.type === 'product' && item.idcompound">
                  <td colspan="3" class="align-middle indentation">
                    <router-link :to="'/product/' + item.idProduct">
                      <small>{{ item.productname }}</small>
                    </router-link>
                  </td>
                </template>
                <template v-else>
                  <td class="align-middle">{{ item.productname }}</td>
                  <td class="align-middle">{{ item.qnt }}</td>
                  <td class="align-middle">{{ formatPrice(item.unitprice) }} €</td>
                </template>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="order.gift && order.gift !== 'null'">
                <td align="right" colspan="3">
                  Confezione regalo
                </td>
                <td align="right">
                  {{ 2.00 }} €
                </td>
              </tr>
              <tr v-if="order.shippingprice > 0 && order.shippingprice !== 'null'">
                <td align="right" colspan="3">
                  Spese di spedizione
                </td>
                <td align="right">
                  {{ formatPrice(order.shippingprice) }} €
                </td>
              </tr>
              <tr v-if="order.codprice > 0">
                <td align="right" colspan="3">
                  Contrassegno
                </td>
                <td align="right">
                  {{ formatPrice(order.codprice) }} €
                </td>
              </tr>
              <tr v-if="order.coupon && order.coupon !== 'null'">
                <td align="right" colspan="3">
                  Coupon sconto {{ order.coupon?.couponcode }}
                </td>
                <td align="right">
                  <template v-if="order.coupon?.type === 'amount'">
                    {{ formatPrice(order.coupon.value) }} €
                  </template>
                  <template v-else>
                    {{ order.coupon.value }} %
                  </template>
                </td>
              </tr>
              <tr>
                <td align="right" colspan="3">Totale ordine</td>
                <td align="right" class="gray">{{ formatPrice(order.total) }} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <router-link to="/orders" class=" btn btn-order">Torna indietro</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { etoken } from "@/constants/constants.js";

export default {
  name: "OrderDetails",
  data() {
    return {
      order: []
    };
  },
  async beforeMount() {
    this.$store.commit('showSpinner');
    let token = localStorage.getItem("token");
    await axios.get("orders/" + this.$route.params.idorder, {
      headers: { Authorization: `Bearer ${token}`, 'e-token': etoken }
    }).then((resp) => {
      this.$store.commit('hideSpinner');
      this.order = resp.data.order;
    }).catch((error) => {
      this.$store.commit('hideSpinner');
      console.log(error);
    });
  },
  methods: {
    formatPrice(value) {
      return Number(value).toFixed(2).replace(".", ",");
    },
    goBack() {
      this.$router.back(); 
    }
  }
};
</script>

<style scoped>
table tfoot td {
  font-weight: bold;
}

table tbody tr {
  border-bottom: 1px solid #dedede;
}

.indentation {
  padding-left: 10px;
}

.thumbnail-detail {
  width: 100px;
}

.thumbnail-detail img {
  padding: 5px;
}

.indentation small {
  font-size: 12px;
}

.btn-order {
  color: #000;
  background-color: #f0c57a;
  border-radius: 0;
  border-color: #f0c57a;
}

.btn-order:hover {
  color: #000;
  background-color: #fff;
  border-radius: 0;
  border-color: #744333;

}
</style>
