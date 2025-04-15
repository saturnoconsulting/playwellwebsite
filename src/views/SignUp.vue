<template>
  <section class="page_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2>Registrati</h2>
          <div class="block">
            <SignUpForm/>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-12 text-center">
          <router-link to="/login">
            Torna alla login
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignUp",
  components: {
    SignUpForm
  }
}
</script>

<style scoped>

</style>