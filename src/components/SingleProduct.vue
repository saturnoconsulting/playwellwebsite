<template>
  <div class="product-item">
    <div class="product-image">
      <div class="favourites-icon">
        <button class="addtofavourites" v-on:click="addToFavourites(product.id)">
          <font-awesome-icon v-if="checkFav" class="redfav" :icon="['fas', 'heart']" style="color: #744333" />
          <font-awesome-icon v-else :icon="['far', 'heart']" style="color: #744333" />
        </button>
      </div>
      <router-link :to="'/product/' + product.slug">
        <img v-if="product.images.length > 0" class="product-thumb" :src="product.images[0].imageUrl" alt="Product image" />
        <img v-else class="product-thumb" :src="'/images/placeholder.jpg'" alt="Placeholder image" />
        <div class="outofstock" v-if="this.product.type !== 'virtual' && !this.product.stock">
          NON DISPONIBILE
        </div>
      </router-link>
    </div>
    <div class="product-content">
      <router-link :to="'/product/' + product.slug" class="product-title">
        <template v-if="product.name">
          {{ product.name }}
        </template>
        <template v-else>
          {{ product.description }}
        </template>
      </router-link>
      <template v-if="product.onlineprice !== 0 && product.onlineprice">
        <h5 v-if="product.discountprice" class="product-price">
          <del>€ {{ formatPrice(product.onlineprice) }}</del>
          € {{ formatPrice(product.discountprice) }}
        </h5>
        <h5 class="product-price" v-else>
          € {{ formatPrice(product.onlineprice) }} €
        </h5>
      </template>
      <template v-else>
        <h5 class="price" v-if="product.discountprice">
          <del>€ {{ formatPrice(product.price) }}</del><br />
          € {{ formatPrice(product.discountprice) }}
        </h5>
        <h5 class="product-price" v-else>
          € {{ formatPrice(product.price) }} €
        </h5>
      </template>
    </div>
  </div>
</template>

<script>
import { PATH_APP } from "@/constants/constants";

export default {
  name: "SingleProduct",
  props: ["product"],
  data() {
    return {
      checkFav: false,
      PATH_APP: PATH_APP,
      productStock: true,
    };
  },
  mounted() {
    // Verifica se il prodotto è nei preferiti quando il componente viene caricato
    this.checkFavourites(this.product.id);
  },
  methods: {
    // Controlla se il prodotto è nei preferiti
    checkFavourites(idprod) {
      let favs = JSON.parse(localStorage.getItem("favs") || "[]");
      // Se l'array dei preferiti contiene l'id del prodotto, imposta checkFav a true
      this.checkFav = favs.includes(idprod);
    },

    // Aggiunge o rimuove il prodotto dai preferiti
    addToFavourites(idprod) {
      let favs = JSON.parse(localStorage.getItem("favs") || "[]");
      const index = favs.indexOf(idprod);

      if (index === -1) {
        // Aggiungi ai preferiti
        favs.push(idprod);
      } else {
        // Rimuovi dai preferiti
        favs.splice(index, 1);
        // Ricarica la pagina se ci si trova nella pagina dei preferiti
        if (this.$route.name === "Favourites") {
          location.reload();
        }
      }
      localStorage.setItem("favs", JSON.stringify(favs));
      this.checkFavourites(idprod); // Rivedi se il prodotto è nei preferiti
    },

    // Formatta il prezzo in un formato leggibile (con virgola per i decimali)
    formatPrice(value) {
      return Number(value).toFixed(2).replace(".", ",");
    },
  },
};
</script>

<style scoped>

.product-title {
  color: #bb965a !important;
  font-size: 18px;
  line-height: 10px !important;
}

.product-thumb {
  background-position: top center;
  background-size: cover;
}

.product-item {
  min-height: 300px;
}

.product-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
}

.product-image .outofstock {
  width: 100%;
  position: absolute;
  overflow: hidden;
  bottom: 0;
  background-color: #dedede;
  text-align: center;
  color: #ffffff;
  padding: 6px;
  opacity: 0.9;
}

img {
  width: 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: scale-down;
}

.text-red {
  color: #e20036;
}

.addtofavourites {
  /*font-size: 25px;*/
  background: #ffffff;
  border: 2px solid #744333;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 0px;
}

.product-image {
  position: relative;
}

.favourites-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 4;
}

.product-content{
  padding-top: 10px;
}

.product-price {
  padding-top: 5px;
  color: #000 !important;
  font-weight: 900;
  font-size: 18px;
}

</style>
