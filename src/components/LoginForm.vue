<template>
  <div class="block">
    <div class="alert alert-danger mt-3" v-if="errors.length > 0" v-for="error in errors">
      {{ error }}
    </div>
    <form class="text-left clearfix" @submit.prevent="checkForm">
      <div class="form-group">
        <label for="username"> Indirizzo email <strong>*</strong> </label>
        <input type="text" class="form-control" name="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password"> Password <strong>*</strong> </label>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" class="form-control" name="password" v-model="password">
          <div class="input-group-append">
            <button class="btn btn-eye-pass" type="button" v-on:click="toggleShow">
              <font-awesome-icon v-if="showPassword" :icon="['fas', 'eye-slash']"/>
              <font-awesome-icon v-else :icon="['fas', 'eye']"/>
            </button>
          </div>
        </div>
      </div>
      <!--<div class="form-group">
        <input class="ricordami mb-3" type="checkbox" name="remember" v-model="remember"/> Ricordami
      </div>-->
      <div class="form-group">
        <button type="submit" class="login btn text-center"><b>Login</b></button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import {BASE_API, cartIDkey, etoken} from "@/constants/constants";

export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      errors: []
    }
  },
  mounted() {
    if (this.$store.getters.getAuth) {
      router.push("/");
    }
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    checkForm() {
      this.errors = [];
      if (this.email && this.password) {
        this.login();
      }
      if (!this.email) {
        this.errors.push('Email required');
      }
      if (!this.password) {
        this.errors.push('Password required');
      }
    },
    async login() {
      this.$store.commit('showSpinner');
      await axios.post(BASE_API + 'login', {
          email: this.email,
          password: this.password,
          idcart: localStorage.getItem(cartIDkey)
        },
      {
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
        document.location.href = "/cart";
      }).catch((error) => {
        this.$store.commit('hideSpinner');
        console.log(error);
        if (error.response.status === 401) {
          this.errors.push('Incorrect username or password');
        } else {
          this.errors.push('Login technical problems. Please retry later.');
        }
      });
    },
  }
}
</script>

<style scoped>

strong {
  color: red;
}
.login {
  color: white;
  background-color: #000;
  border-radius: 0;
  border-color: #744333;
  padding: 20px 40px 20px 40px !important;
}

.login:hover {
  color: black;
  background-color: white;
  border-color: #000;
  padding: 20px 40px 20px 40px !important;
}


h2 {
  margin-bottom: -80px;
  margin-top: 70px;
}

label {
  margin-bottom: 7px;
}

.form-control {
  margin-bottom: 10px;
}

.block {
  border-radius: 2%;
  padding-top: 0;
}

.btn-eye-pass {
  height: 45px;
  background-color: #000;
  color: #fff;
  border-radius: 0;
}


.btn-eye-pass:hover {
  background-color: #333333;
  color: #ffff;
}

</style>