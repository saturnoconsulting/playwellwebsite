<template>
  <section class="page_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2>Login</h2>
          <LoginForm/>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-12 text-center">
          <router-link to="/recover">Recupera password</router-link><br>
          <router-link to="/signup" class="brand-color">Registrati</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>


import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components:{
    LoginForm
  }
}
</script>

<style scoped>

</style>