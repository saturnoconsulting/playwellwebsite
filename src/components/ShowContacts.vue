<template>
  <div class="section-contacts">
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="mt-3 mb-5">
            Scrivici
          </h1>
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="35" viewBox="0 0 384 512">
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
              </svg>
              <h3 class="mt-3 mb-4">
                Indirizzo
              </h3>
              <p>
                PLAYWELL STORE<br>
                Via Verdi 31,
                67100 L'Aquila AQ<br>
                <a href="mailto:playwell.aq@gmail.com">playwell.aq@gmail.com</a><br>
                329 162 8374
              </p>
            </div>
            <div class="col-lg-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="40" viewBox="0 0 512 512">
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
              </svg>
              <h3 class="mt-3 mb-4">
               Orari di apertura
              </h3>
              <p>
                Dal Lunedì al Sabato<br>
                10:00–13:00,<br>
                16:00–20:00<br>
                Domenica Chiuso
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="alert alert-success" v-if="success">
            Il messaggio è stato inviato correttamente. Ti risponderemo al più presto.
          </div>
          <div class="alert alert-danger" v-if="error">
            Problemi tecnici nell'invio del messaggio. Riprovare più tardi.
          </div>
          <div class="alert alert-danger mt-3" v-if="errors.length > 0" v-for="error in errors">
            {{ error }}
          </div>
          <form @submit.prevent="checkForm()">
            <div class="form-group">
              <input type="email" v-model="email" class="form-control" placeholder="La tua email">
            </div>
            <div class="form-group">
              <input type="text" v-model="name" class="form-control" placeholder="Il tuo nome">
            </div>
            <div class="form-group">
              <textarea class="form-control" v-model="message" rows="4" placeholder="Messaggio"></textarea>
            </div>
            <button type="submit" class="btn btn-brand mt-20">Invia</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BASE_API, etoken} from "@/constants/constants.js";
import axios from "axios";

export default {
  name: "ShowContacts",
  data() {
    return {
      errors : [],
      base : BASE_API,
      email: null,
      name: null,
      message: null,
      success: false,
      error: false
    }
  },
  methods : {
    checkForm() {
      this.errors = [];
      if (!this.email || !this.name || !this.message) {
        this.errors.push(
            "I campi sono tutti obbligatori, si prega di ricontrollare i campi del form."
        );
      }
      if (this.errors.length === 0) {
        this.sendMessage();
      }
    },
    async sendMessage(){
      this.$store.commit('showSpinner');
      await axios.post(BASE_API + "sendmail", {
        "email" : this.email,
        "name": this.name,
        "message": this.message
      }, {
        headers: {
          'Content-Type': 'application/json',
          'e-token': etoken
        }
      }).then((res) => {
        this.$store.commit('hideSpinner');
        this.name = null;
        this.email = null;
        this.message = null;
        this.success = true;
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        this.error = true;
        console.log(error);
      });
    }
  }
}

</script>

<style scoped>

.section-contacts {
  position: relative;
  /*background-color: #f0c57a;*/
  padding: 50px;
}

.container {
  bottom: 0;
  left: 0;
  right: 0;
  height:100%;
  background-color: white;
 /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);*/
  z-index: 1;
}

.form-group input, .form-group textarea {
  border-radius: 10px;
  border: none;
  background-color: #f7f7f7;
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
  border-color: #f0c57a;
  padding: 10px 30px !important;
}

textarea{
  font-size: 12px;
}
</style>