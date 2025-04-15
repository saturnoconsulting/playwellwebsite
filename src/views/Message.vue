<template>
  <section class="page_wrapper">
    <div class="container">
      <div class="row" v-if="mex === 1">
        <div class="col-lg-12 text-center">
          <h4>Ordine inviato</h4>
          <br>
          <div class="alert alert-success">
          L'ordine è stato effettuato correttamente. Riceverai una mail con tutti i dettagli.
          </div>
          <router-link to="/" class="btn btn-brand">Continua con lo shopping</router-link>
        </div>
      </div>
      <div class="row" v-if="mex === 2">
        <div class="col-lg-12 text-center">
          <h4>Problemi con l'ordine</h4>
          <br>
          <div class="alert alert-danger">
            Il tuo ordine non è stato effettuato correttamente. Prego riprovare più tardi.
          </div>
          <router-link to="/" class="btn btn-brand">Continua con lo shopping</router-link>
        </div>
      </div>
      <div class="row" v-if="mex === 3">
        <div class="col-lg-12 text-center">
          <h4>Cambio password</h4>
          <br>
          <div class="alert alert-success">
            La tua password è stata cambiata.
          </div>
          <router-link to="/login" class="btn btn-brand">Continua con il login</router-link>
        </div>
      </div>
      <div class="row" v-if="mex === 4">
        <div class="col-lg-12 text-center">
          <h4>Pagamento effettuato</h4>
          <br>
          <div class="alert alert-success">
           Pagamento effettuato con successo
          </div>
          <router-link to="/" class="btn btn-brand">Torna alla home</router-link>
        </div>
      </div>
      <div class="row" v-if="mex === 5">
        <div class="col-lg-12 text-center">
          <h4>Pagamento rifiutato</h4>
          <br>
          <div class="alert alert-danger">
           Il tuo pagamento è stato rifiutato per problemi tecnici
          </div>
          <router-link to="/" class="btn btn-brand">Torna alla home</router-link>
        </div>
      </div>
      <div class="row" v-if="mex === 6">
        <div class="col-lg-12 text-center">
          <h4>Ordine pagato</h4>
          <br>
          <div class="alert alert-danger">
          L'ordine è già stato pagato
          </div>
          <router-link to="/" class="btn btn-brand">Ritorna allo shopping</router-link>
        </div>
      </div>
      <div class="row" v-if="mex === 7">
        <div class="col-lg-12 text-center">
          <h4>Ordine inoltrato con successo</h4>
          <br>
          <div class="alert alert-success">
            Ordine inoltrato con successo, riceverai una mail con la conferma dell'ordine.
          </div>
          <router-link to="/" class="btn btn-brand">Ritorna allo shopping</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "Messages",
  data(){
    return {
      mex : parseInt(this.$route.params.mex)
    }
  }
}
</script>

<style scoped>

</style>