<template>
  <div class="page_wrapper">
    <div class="checkout shopping">
      <div class="container">
        <div v-if="islogged != null">
          <CheckoutForm />
        </div>
        <div v-else class="login">
          <h3 class="text-center mb-4">Per completare l'ordine devi essere registrato.</h3>
          <div class="button-group">
            <router-link to="/login">
              <button class="btn btn-brand btn-lg mb-3">Login</button>
            </router-link>
            <router-link to="/signup">
              <button class="btn btn-brand btn-lg">Registrati</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CheckoutForm from "@/components/CheckoutForm.vue";

export default {
  name: "Checkout",
  data() {
    return {
      islogged: localStorage.getItem("token"),
    }
  },
  components: {
    CheckoutForm
  }
}
</script>

<style scoped>
.btn-brand {
  text-align: center;
  color: white;
  background-color: #efc47a;
  margin:10px
}

.btn-brand:hover {
  color: black;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.login {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>