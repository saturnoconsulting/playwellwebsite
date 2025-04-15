<template>
  <div class="alert alert-success" v-if="message">{{message}}</div>
  <div class="alert alert-danger mt-3" v-if="errors.length > 0" v-for="error in errors">
    {{error}}
  </div>
  <form class="text-left clearfix" @submit.prevent="checkForm()">
    <p>
      Inserisci la tua e-mail qui sotto per il recupero della password del tuo account, ti verrà inviato un link temporaneo di reimpostazione password.
      Una volta ricevuto potrai scegliere una nuova password per il tuo account.
    </p>
    <div class="form-group">
      <label class="form-label">E-mail <strong>*</strong></label>
      <input type="email" class="form-control mb-3" v-model="email">
    </div>
    <div class="form-group">
      <button type="submit" class="btn login">Recupera password</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {etoken} from "@/constants/constants.js";

export default {
  name: "RecoverForm",
  data(){
    return {
      email : null,
      remember : false,
      message : null,
      errors : [],
    }
  },
  methods: {
    checkForm(){
      this.errors = [];
      if (this.email) {
        this.recoverPassword();
      }
      if (!this.email) {
        this.errors.push('Email required');
      }
    },
    async recoverPassword(){
      this.$store.commit('showSpinner');
      let token = localStorage.getItem("token");
      axios.post("recover", {
        email : this.email,
        type : "website"
      },{
        headers: {Authorization: `Bearer ${token}`, 'e-token': etoken}
      }).then((response) => {
        this.$store.commit('hideSpinner');
        this.message = response.data.message;
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        if(error.response.status === 400) {
          Swal.fire({
            title: error.response.data.error ? error.response.data.error : "Technical problems to recover password.",
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#e20036',
          });
          console.log(error);
        }else{
          console.log(error);
        }
      });
    }
  }
}
</script>

<style scoped>

strong{
  color: red;
}

.login {
  font-size: 15px !important;
  font-weight: bolder;
  color: white;
  background-color: #000;
  border-radius: 0;
  border-color: #744333;
  padding: 20px 40px 20px 40px !important;
}

.login:hover {
  color: black;
  background-color: #fff;
  border-color: #744333;
  padding: 20px 40px 20px 40px !important;
}

</style>