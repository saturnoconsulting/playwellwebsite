<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <font-awesome-icon class="icon-box" icon="truck" />
          <h5>Spedizioni gratis</h5>
          <p class="text">
            Disponibile per tutti gli ordini in Italia a partire da 100 EUR.
          </p>
        </div>
        <div class="col-lg-3 col-md-6">
          <font-awesome-icon class="icon-box" icon="bag-shopping" />
          <h5>Paga alla consegna</h5>
          <p class="text">
            Puoi scegliere di pagare in contanti al momento della consegna.
          </p>
        </div>
        <div class="col-lg-3 col-md-6">
          <font-awesome-icon class="icon-box" icon="umbrella" />
          <h5>Rimborso e reso</h5>
          <p class="text">
            30 giorni per inviarci indietro il prodotto in caso di ripensamenti.
            Le spese di spedizione per il reso sono a carico dell’acquirente.
          </p>
        </div>
        <div class="col-lg-3 col-md-6">
          <font-awesome-icon class="icon-box" icon="shield" />
          <h5>Pagamento Sicuro</h5>
          <p class="text">
            PayPal risarcisce l’acquirente in caso di mancata consegna.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ShowBanner",
  components: {FontAwesomeIcon},
  data() {
    return {}
  },
}
</script>

<style scoped>
.section{
  background-color: #2d33a4;
  padding: 50px;
}

/* Il testo deve stare sopra l'overlay */
.background-overlay .display-5 {
  position: relative;
  z-index: 2;
}

h5{
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
}

p{
  color: #fff;
}

.icon-box{
  font-size: 40px;
  color: #fff;
}
</style>
