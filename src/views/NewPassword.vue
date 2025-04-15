<template>
  <section class="page_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="alert alert-danger mt-3" v-if="errors.length > 0" v-for="error in errors">
            {{error}}
          </div>
          <form @submit.prevent="checkForm()">
            <h2>Insert new password</h2>
            <div class="form-group">
              <label class="form-label">New password <strong>*</strong></label>
              <input type="password" class="form-control mb-3" v-model="newPassword">
            </div>
            <div class="form-group">
              <label class="form-label">Confirm password <strong>*</strong></label>
              <input type="password" class="form-control mb-3" v-model="confPass">
            </div>
            <button type="submit" class="login btn btn-brand btn-sm"><b>Change password</b></button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export default {
  name: "NewPassword",
  data() {
    return {
      token : this.$route.params.token,
      newPassword: null,
      confPass : null,
      errors: []
    }
  },
  methods: {
    checkForm(){
      this.errors = [];
      if (this.newPassword && this.confPass && this.confPass === this.newPassword) {
        this.changePass();
      }
      if (!this.newPassword || !this.confPass || this.confPass !== this.newPassword) {
        this.errors.push('All fields are required and they must have same length.');
      }
    },
    changePass(){
      axios.post("changepass", {
        token : this.token,
        password : this.newPassword,
        confpass : this.confPass
      }).then(res => {
        router.push("/message/3");
      }).catch((error) => {
        if(error.response.status === 400) {
          Swal.fire({
            title: error.response.data.error ? error.response.data.error : "Technical problems to change password.",
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
</style>