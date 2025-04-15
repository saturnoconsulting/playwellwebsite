<template>
  <section class="page_wrapper products section">
    <div class="container shopping">
      <div class="row">
        <div class="col-lg-12">
          <h5 class="widget-title">I tuoi prodotti preferiti</h5>
        </div>
      </div>
      <div class="row" v-if="emptyMessage">
        <div class="col-lg-12">
          <p>Non sono presenti prodotti.</p>
        </div>
      </div>
      <div class="row products-list mt-5">
        <div class="col-md-4 col-6" v-for="product in wishProducts">
          <SingleProduct :product="product" :key="product"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>


import SingleProduct from "@/components/SingleProduct.vue";

export default {
  name:"Favourites",
  components: {SingleProduct},
  data(){
    return {
      favProducts : [],
      emptyMessage : false
    }
  },
  computed : {
    start(){
      return this.$store.getters.getStatusStartWish;
    },
    wishTotalProducts(){
      return this.$store.getters.getStatusWishTotalProducts;
    },
    wishProducts(){
      return this.$store.getters.getStatusWishProducts;
    }
  },
  beforeMount() {
    if(localStorage.getItem("favs") && localStorage.getItem("favs") !== null){
      this.favProducts = JSON.parse(localStorage.getItem("favs"));
    }
    this.getProducts();
  },
  unmounted() {
    window.removeEventListener("scroll",this.listener);
  },
  methods:{
    getProducts(){
      this.$store.dispatch("setSpinnerLoading", true);
      this.$store.dispatch("emptyWishProducts");
      if(this.favProducts.length) {
        this.$store.dispatch("getProducts", {"start": this.start, "idsProduct": this.favProducts}).then(() => {
          window.addEventListener("scroll", this.listener);
          this.$store.dispatch("setSpinnerLoading", false);
        });
      }else{
        this.emptyMessage = true;
      }
    },
    listener() {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 150) {
        window.removeEventListener("scroll",this.listener);
        if(this.wishProducts.length === this.wishTotalProducts) {
          this.$store.dispatch("setSpinnerLoading", false);
        }else{
          this.$store.dispatch("setSpinnerLoading", true);
          this.$store.dispatch("getProducts", {"start" : this.start, "query" : this.query, "idsProduct" : this.favProducts}).then(() => {
            this.$store.dispatch("setSpinnerLoading", false);
            window.addEventListener("scroll", this.listener);
          });
        }
      }
    }
  }
}

</script>

<style scoped>

</style>