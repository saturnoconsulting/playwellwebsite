<template>
  <section class="page_wrapper">
    <div class="container shopping">
      <div class="row">
        <div class="col-lg-12">
          <h4 class="widget-title text-left">Area Personale</h4>
        </div>
      </div>
      <form @submit.prevent="editprofile">
        <div class="row">
          <!-- Colonna sinistra con immagine e menu -->
          <div class="col-lg-3 d-flex flex-column align-items-center">
            <!--img class="img-fluid personal-image" :src="profile.avatar" v-if="profile.avatar"/>
            <img class="img-fluid personal-image" src="/public/images/placeholder.jpg" v-else/-->
            <button @click="$router.push('orders')" class="btn btn-menu">Ordini</button>
            <button class="btn btn-menu mb-4" v-on:click="logout();">
              Logout
            </button>
          </div>
          <!-- Colonna destra con modulo dati personali -->
          <div class="col-lg-9">
            <div class="row">
              <!-- Modulo per i dati personali (nome, cognome, email, telefono...) -->
              <div class="form-group col-lg-6 col-sm-6">
                <label for="name">Nome<strong>*</strong></label>
                <input type="text" class="form-control" id="name" placeholder="Il tuo nome" v-model="profile.name" />
              </div>
              <div class="form-group col-lg-6 col-sm-6">
                <label for="surname">Cognome<strong>*</strong></label>
                <input type="text" class="form-control" id="surname" placeholder="Il tuo cognome"
                  v-model="profile.surname" />
              </div>
              <div class="form-group col-lg-6 col-sm-12">
                <label for="email">Email<strong>*</strong></label>
                <input type="email" class="form-control" id="email" placeholder="La tua email"
                  v-model="profile.email" />
              </div>
              <div class="form-group col-lg-6">
                <label for="phone">Telefono<strong>*</strong></label>
                <input type="tel" class="form-control" id="phone" placeholder="Il tuo numero di telefono"
                  v-model="profile.phone" />
              </div>
              <div class="form-group col-lg-12">
                <label for="address">Indirizzo<strong>*</strong></label>
                <input type="text" class="form-control" id="address" placeholder="Il tuo indirizzo"
                  v-model="profile.address" />
              </div>
              <div class="form-group col-lg-6 col-sm-3">
                <label for="civico">Num civico<strong>*</strong></label>
                <input type="text" class="form-control" id="civico" placeholder="Num. Civico"
                  v-model="profile.numciv" />
              </div>
              <div class="form-group col-lg-3 col-sm-3">
                <label for="cap">CAP<strong>*</strong></label>
                <input type="text" class="form-control" id="cap" placeholder="CAP" v-model="profile.cap" />
              </div>
              <div class="form-group col-lg-3 col-sm-3">
                <label for="prov">Provincia<strong>*</strong></label>
                <input type="text" class="form-control" id="prov" placeholder="Provincia" v-model="profile.prov" />
              </div>
              <div class="form-group col-lg-6 col-sm-3">
                <label for="city">Città<strong>*</strong></label>
                <input type="text" class="form-control" id="city" placeholder="Città" v-model="profile.city" />
              </div>
              <div class="form-group col-lg-6">
                <label for="country">Paese<strong>*</strong></label>
                <select class="form-control" id="country" v-model="profile.country">
                  <option v-for="country in countries" :key="country" :value="country">
                    {{ country }}
                  </option>
                </select>
              </div>
              <div class="col-lg-6">
                <button class="align-center mt-5 btn btn-order">
                  SALVA
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>



<script>
import indexOrders from "@/components/IndexOrders.vue";
import { etoken } from "@/constants/constants.js";

export default {
  name: "UserArea",
  components: {
    indexOrders
  },
  data() {
    return {
      profile: {
        name: null,
        surname: null,
        address: null,
        numciv: null,
        cap: null,
        city: null,
        prov: null,
        phone: null,
        country: null,
        email: null,
        avatar: null
      },
      countries: [
        // Lista dei paesi
        "Italy"
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getProfile").then(() => {
      this.updateProfile();
    });
  },
  methods: {
    async logout() {
      await this.$store.dispatch("Logout");
    },
    updateProfile() {
      const storeProfile = this.$store.getters.getProfile;
      if (storeProfile) {
        this.profile = { ...storeProfile };
      }
    },
    editprofile() {
      this.$store.dispatch("editProfile", {
        name: this.profile.name,
        surname: this.profile.surname,
        address: this.profile.address,
        numciv: this.profile.numciv,
        cap: this.profile.cap,
        city: this.profile.city,
        prov: this.profile.prov,
        phone: this.profile.phone,
        country: this.profile.country,
        email: this.profile.email,
        avatar: this.profile.avatar
      }, {
        headers: {
          'Content-Type': 'application/json',
          'e-token': etoken
        }
      });
    }
  }
}
</script>


<style scoped>
.personal-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.page_wrapper {
  padding: 20px 0;
}

.widget-title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.nav-link {
  color: #744333;
}

.btn-menu {
  background-color: #f7f7f7;
  border: none;
  color: #000;
  margin-bottom: 5px;
  border-radius: 0;
  width: 100%;
}

.btn-menu:hover {
  background-color: #f0c57a;
  color: white !important;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  height: 45px;
  border: none;
  border-radius: 10px;
  background-color: #f7f7f7;
}

select {
  padding: 5px !important;
  color: grey;
}

strong {
  color: red;
}

.btn-order {
  color: #fff;
  background-color: #f0c57a;
  border-radius: 0;
  border-color: #f0c57a;
  padding: 20px 40px 20px 40px !important;
}

.btn-order:hover {
  color: #000;
  background-color: #fff;
  border-color: #744333;
  padding: 20px 40px 20px 40px !important;
}
</style>
