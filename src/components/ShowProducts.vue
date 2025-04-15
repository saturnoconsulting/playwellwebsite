<template>
  <section class="products related-products section shopping">
    <div class="container">
      <div class="row mt-5 mb-5">
        <div class="col-lg-12" v-if="search">
          <h3 class="lead mb-4">Cerca un prodotto</h3>
          <form @submit.prevent="getProducts">
            <div class="input-group">
              <input type="text" placeholder="Cerca..." class="form-control search" v-on:focus="emptyProds"
                v-model="query" required>
              <div class="input-group-append">
                <button class="btn btn-brand btn-sm" type="submit">Cerca</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-5" v-if="search && searchProducts.length">
        <div class="col-lg-12">
          <h5 class="widget-title">Risultati per "{{ query }}"</h5>
        </div>
      </div>
      <div class="row" v-if="!search && emptyMessage">
        <div class="col-lg-12">
          <div class="alert alert-info">Non ci sono prodotti da mostrare.</div>
        </div>
      </div>
      <div class="row" v-if="search && emptySearch">
        <div class="col-lg-12">
          <div class="alert alert-info">Nessun prodotto trovato.</div>
        </div>
      </div>
      <div class="row products-list mt-5">
        <div class="col-6 col-md-4 col-lg-3" v-for="product in searchProducts" v-if="search">
          <SingleProduct :product="product" :key="product.id" />
        </div>
        <div class="col-6 col-md-4 col-lg-3" v-for="product in products" v-else>
          <SingleProduct :product="product" :key="product.id" />
        </div>
      </div>

    </div>
    <div class="d-flex justify-content-center mt-5 mb-5">
      <div class="spinner spinner-border" role="status" v-if="spinnerLoading">
        <span class="visually-hidden"></span>
      </div>
    </div>
  </section>
</template>

<script>
import SingleProduct from "@/components/SingleProduct.vue";
import { etoken } from "@/constants/constants.js";

export default {
  name: "ShowProducts",
  components: { SingleProduct },
  props: {
    search: Boolean
  },
  data() {
    return {
      emptyMessage: false,
      emptySearch: false,
      idsCategory: this.$route.params.categoryId ? [this.$route.params.categoryId] : null,
      prevRoute: null
    }
  },
  computed: {
    query: {
      get() {
        return this.$store.getters.getStatusSearch;
      },
      set(value) {
        this.$store.dispatch("setStatusSearch", value);
      }
    },
    category() {
      return this.$store.getters.getCategory;
    },
    start() {
      if (this.search) {
        return this.$store.getters.getStatusStartSearch;
      } else {
        return this.$store.getters.getStatusStart;
      }
    },
    searchProducts() {
      return this.$store.getters.getStatusSearchProducts;
    },
    searchTotalProducts() {
      return this.$store.getters.getStatusSearchTotalProducts;
    },
    products() {
      return this.$store.getters.getStatusProducts;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    totalProducts() {
      return this.$store.getters.getStatusTotalProducts;
    },
    spinnerLoading() {
      return this.$store.getters.getStatusSpinnerLoading;
    },
    filterCategory() {
      return this.$store.getters.getFilterCategory;
    }
  },
  created() {
    this.prevRoute = this.$router.options.history.state.forward;
  },
  beforeMount() {
    this.$store.dispatch("getCategories").then(() => {
      if (this.$route.params.categoryId) {
        let index = this.categories.findIndex((elem) => elem.id === this.$route.params.categoryId);
        if (index !== -1) {
          this.$store.commit("SET_FILTER_CATEGORY", {
            "idCat": this.$route.params.categoryId,
            "catName": this.categories[index].description
          });
        }
      } else {
        this.$store.commit("SET_FILTER_CATEGORY", null);
      }
    });
  },

  mounted() {
    if (!this.search) {
      //non sono dentro search
      if (this.products.length === 0 || this.prevRoute === null || (this.prevRoute && !this.prevRoute.includes("/product/"))) {
        //se dentro prevRoute non c'é /products/
        this.$store.commit("EMPTY_PRODUCTS");
        this.getProducts();
      } else {
        //questo lo fa quando giungo da /products/idprod
        window.addEventListener("scroll", this.listener);
      }
    } else {
      this.$store.dispatch("setSpinnerLoading", false);
      window.addEventListener("scroll", this.listener);
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.listener);
  },
  methods: {
    emptyProds() {
      this.$store.dispatch("emptySearchProducts");
    },
    getProducts() {
      this.$store.dispatch("getProducts", {
        "start": this.start,
        "query": this.search ? this.query : null,
        "idsCategory": this.idsCategory,
        "tags": this.$route.path === '/' ? ["home"] : null
      }, {
        headers: {
          'Content-Type': 'application/json',
          'e-token': etoken
        }
      }).then(() => {
        window.addEventListener("scroll", this.listener);
        if (this.query && this.searchTotalProducts === 0) {
          this.emptySearch = true;
        } else if (!this.query && this.totalProducts === 0) {
          this.emptyMessage = true;
        } else {
          this.emptySearch = false;
          this.emptyMessage = false;
        }
      });
    },
    listener() {
      let scrollTop = document.documentElement.scrollTop;//number of pixels that an element's content is scrolled vertically
      let scrollHeight = document.documentElement.scrollHeight;//height of an element's content
      let clientHeight = document.documentElement.clientHeight;//the inner height of an element in pixels
      let offset = window.innerWidth <= 768 ? 1200 : 500;
      //console.log("scrollTop: " + scrollTop + " scrollHeight: " + scrollHeight + " clientHeight: " + clientHeight);
      if (scrollTop + clientHeight >= scrollHeight - offset) {
        window.removeEventListener("scroll", this.listener);
        if (this.search) {
          //listener for search
          if (this.searchProducts.length === this.searchTotalProducts) {
            this.$store.dispatch("setSpinnerLoading", false);
          } else {
            this.$store.dispatch("setSpinnerLoading", true);
            this.$store.dispatch("getProducts", {
              "start": this.start,
              "query": this.query,
              "idsCategory": this.idsCategory
            }).then(() => {
              this.$store.dispatch("setSpinnerLoading", false);
              window.addEventListener("scroll", this.listener);
            });
          }
        } else {
          //listener for products
          if (this.products.length === this.totalProducts) {
            this.$store.dispatch("setSpinnerLoading", false);
          } else {
            this.$store.dispatch("setSpinnerLoading", true);
            this.$store.dispatch("getProducts", { "start": this.start, "idsCategory": this.idsCategory }).then(() => {
              this.$store.dispatch("setSpinnerLoading", false);
              window.addEventListener("scroll", this.listener);
            });
          }
        }
      }
    }
  }
}

</script>

<style scoped>
.form-control {
  height: 45px;
  border: none;
  background-color: #f7f7f7;
}

.form-group input,
.form-group textarea {
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
}

.btn-brand:hover {
  color: black;
  background-color: white !important;
  border-radius: 0px 10px 10px 0px;
  border-color: #f0c57a !important;
  padding: 10px 30px !important;
}
</style>