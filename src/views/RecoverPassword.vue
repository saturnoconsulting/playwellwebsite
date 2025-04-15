<template>
  <section class="page_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2>Recover password</h2>
          <RecoverForm/>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-12 text-center">
          <router-link to="/login">
            Back to log in
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RecoverForm from "@/components/RecoverForm.vue";
export default {
  name: "RecoverPassword",
  components:{
    RecoverForm
  }
}
</script>

<style scoped>

</style>