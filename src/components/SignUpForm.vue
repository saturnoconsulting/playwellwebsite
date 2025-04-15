<template>
  <div class="alert alert-danger mt-3" v-if="errors.length > 0" v-for="error in errors">
    {{error}}
  </div>
  <form @submit.prevent="checkForm()" class="text-left clearfix">
    <div class="form-group">
      <label for="username" class="form-label">Nome: <strong>*</strong></label>
      <input type="text" class="form-control mb-3" v-model="user.name">
    </div>
    <div class="form-group">
      <label for="username" class="form-label">Cognome: <strong>*</strong></label>
      <input type="text" class="form-control mb-3" v-model="user.surname">
    </div>
    <div class="form-group">
      <label for="username" class="form-label">E-mail: <strong>*</strong></label>
      <input type="email" class="form-control mb-3" v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password" class="form-label">Password: <strong>*</strong></label>
      <input type="password" class="form-control mb-3" v-model="user.password">
    </div>
    <p>
      I tuoi dati personali verranno utilizzati per supportare la tua esperienza su questo sito web, per
      gestire l'accesso al tuo account e per altri scopi descritti nella nostra
      <router-link to="/privacy-policy">privacy policy.</router-link>
    </p>
    <button type="submit" class="login btn text-center"><b>Registrati</b></button>
  </form>
</template>

<script>
import axios from "axios";
import {BASE_API, etoken, PATH_APP} from "@/constants/constants";
import Swal from "sweetalert2";
export default {
  name: "SignUpForm",
  data() {
    return {
      user: {
        name: null,
        surname: null,
        email: null,
        password: null,
      },
      errors: []
    }
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (this.user.name && this.user.surname && this.user.email && this.user.password) {
        this.signup();
      }
      if (!this.user.name) {
        this.errors.push('Name required');
      }
      if (!this.user.surname) {
        this.errors.push('Surname required');
      }
      if (!this.user.email) {
        this.errors.push('Email required');
      }
      if (!this.user.password) {
        this.errors.push('Password required');
      }
    },
    async signup() {
      this.$store.commit('showSpinner');
      await axios.post(BASE_API + 'signup', {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        password: this.user.password
      },{
        headers: {
          'Content-Type': 'application/json',
          'e-token': etoken
        }
      }).then((res) => {
        //set expire
        localStorage.setItem('expires', Math.floor(Date.now() / 1000) + res.data.expires_in);
        //set token
        localStorage.setItem("token", res.data.token);
        //set refreshtoken
        localStorage.setItem("refreshtoken", res.data.refreshtoken);
        //set user
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.$store.commit("SET_AUTH", true);
        this.$store.commit('hideSpinner');
        document.location.href = PATH_APP;
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        console.log(error);
        if(error.response.status === 400) {
          Swal.fire({
            title: error.response.data.error ? error.response.data.error : "Error on signup. E-mail is already in our systems.",
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#e20036',
          });
        }else{
          console.log(error);
        }
      });
    }
  }
}
</script>

<style scoped>
.login {
  color: white;
  background-color: #000;
  border-radius: 0;
  border-color: #000;
  padding: 20px 40px 20px 40px !important;
}

.login:hover {
  color: black;
  background-color: #fff;
  border-color: #000;
  padding: 20px 40px 20px 40px !important;
}

strong{
  color: red;
}
</style>