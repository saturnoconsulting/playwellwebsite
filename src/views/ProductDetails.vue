<template>
  <section class="page_wrapper">
    <div class="container">
      <div class="d-flex justify-content-center mt-5 mb-5" v-if="spinnerLoading">
        <div class="spinner spinner-border" role="status">
          <span class="visually-hidden"></span>
        </div>
      </div>
      <div v-if="!spinnerLoading">
        <div class="row">
          <div class="col-lg-5 col-md-12 col-sm-12">
            <template v-if="product.images?.length > 0">
              <div class="single-product-slider">
                <div class="image-border">
                  <img class="image" :src="product.images?.[slide]?.imageUrl" alt="" />
                </div>
                <ol class="d-flex justify-content-center carousel">
                  <li v-for="(image, index) in product.images" :key="index">
                    <img class="image-carousel" :src="product.images?.[index]?.imageUrl"
                      v-on:click="changeIndex(index)" />
                  </li>
                </ol>
              </div>
            </template>
            <template v-if="product.images?.length === 0">
              <img class="image" :src="'/images/placeholder.jpg'" alt="" />
            </template>
          </div>
          <div class="col-lg-7 col-md-12 col-sm-12">
            <div class="single-product-details">
              <h1 class="product-title mb-4">
                <span v-if="product.name">
                  {{ product.name }}
                </span>
                <span v-else>
                  {{ product.description }}
                </span>
              </h1>
              <div class="category">
                <router-link :to="'/category/' + product.category?.slug">
                  {{ product.category?.description }}
                </router-link>
              </div>
              <div class="d-flex">
                <template v-if="product.onlineprice !== 0 && product.onlineprice">
                  <p v-if="product.discountprice" class="product-price">
                    <del>€ {{ formatPrice(product.onlineprice) }}</del>
                    € {{ formatPrice(product.discountprice) }}
                  </p>
                  <p class="product-price" v-else>
                    € {{ formatPrice(product.onlineprice) }} €
                  </p>
                </template>
                <template v-else>
                  <p class="price" v-if="product.discountprice">
                    <del>€ {{ formatPrice(product.price) }}</del><br />
                    € {{ formatPrice(product.discountprice) }}
                  </p>
                  <p class="product-price" v-else>
                    € {{ formatPrice(product.price) }} €
                  </p>
                </template>
                <button class="addtofavourites mt-1 ml-3" v-on:click="addToFavourites(product.id)">
                  <font-awesome-icon v-if="checkFav" class="redfav" :icon="['fas', 'heart']" style="color: #744333" />
                  <font-awesome-icon v-else :icon="['far', 'heart']" style="color: #744333" />
                </button>
              </div>
              <div class="available" v-if="product.variants && product.variants.length > 0">
                <!-- Se il prodotto ha varianti, e una variante è selezionata, mostra la disponibilità -->
                <div class="out-of-stock" v-if="selectId">
                  <p class="sold-out" v-if="checkQnts(selectId)">Esaurito</p>
                  <p class="available" v-else>Disponibile</p>
                </div>
              </div>
              <!-- Se il prodotto ha varianti e non è stata selezionata nessuna variante, non mostrare nulla -->
              <div class="variants-select" v-if="product.variants && product.variants.length > 0">
                <div class="mt-3 mb-3">
                  <select class="form-control pl-2 pt-2 pb-2" v-model="selectId" @change="selectPush">
                    <option value="">Seleziona una prodotto</option>
                    <option :value="el.id" v-for="el in product.variants" :key="el.idProduct">
                      {{ el.description.toUpperCase() }}
                    </option>
                  </select>
                </div>
              </div>
              <div v-else>
                <p class="sold-out" v-if="checkQnts(selectId)">Esaurito</p>
                <p class="available" v-else>Disponibile</p>
              </div>
              <form class="text-left clearfix" @submit.prevent="addToCart">
                <div class="product-quantity mt-4 d-flex align-items-center">
                  <div class="product-quantity-slider me-2">
                    <input type="number" min="1" :max="product.type === 'virtual' ? '' : stocks" name="product-quantity"
                      class="form-control" v-model="qnt" />
                  </div>
                  <button type="submit" class="btn btn-cart" v-bind:disabled="checkQnts()">
                    Aggiungi al carrello
                  </button>
                </div>
              </form>
              <div class="disclaimer-products">
                <h5>Spedizione gratis</h5>
                <p>Disponibili per tutti gli ordini in Italia a partire da 100 €</p>
                <h5>Rimborso e reso</h5>
                <p>
                  30 giorni per inviarci indietro il prodotto in caso di ripensamenti.
                  Le spese di spedizione per il reso sono a carico dell’acquirente.
                </p>
                <h5>Pagamento sicuro</h5>
                <p>
                  I pagamenti vengono gestiti sui server sicuri del gateway di pagamento
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12" v-if="product.descriptionExtended">
            <div class="description mt-5">
              <div class="description">
                <h4>Descrizione</h4>
                <div v-html="product.descriptionExtended"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { BASE_API, etoken, PATH_APP } from "@/constants/constants";
import Swal from "sweetalert2";

export default {
  name: "ProductDetails",
  data() {
    return {
      idVar: null,
      product: [],
      stocks: 0,
      size: null,
      slide: 0,
      subproducts: [],
      qnt: 1,
      gift: false,
      base: PATH_APP,
      checkFav: false,
      selectId: "",
      nameSizeSelected: null,
    };
  },
  computed: {
    spinnerLoading() {
      return this.$store.getters.getStatusSpinnerLoading;
    },
  },
  mounted() {
    this.getProduct();
    this.getStock();
    this.checkQnts();
  },
  methods: {
    checkQnts() {
      return this.product.type === "virtual" ? false : this.stocks <= 0;
    },

    async getProduct() {
       this.$store.dispatch("setSpinnerLoading", true);
       await axios.post(BASE_API + "products", {
            start: 0,
            limit: 100,
            slugProduct: this.$route.params.slug,
            type: "website",
          },{
            headers: {
              "Content-Type": "application/json",
              "e-token": etoken,
            },
          }
        ).then((response) => {
         this.$store.dispatch("setSpinnerLoading", false);
         if (response.data.products.length > 0) {
           this.product = response.data.products[0];
           this.getStock().then(() => {
             this.scrollTop();
           });
           document.title = this.product.name || this.product.description;
           this.checkFavourites(this.product.id);
         } else {
           router.push({ name: "not-found", params: { pathMatch: 'not-found' }});
         }
       }).catch((error) => {
         this.$store.dispatch("setSpinnerLoading", false);
         console.log(error);
       });
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    async getStock(idVar) {
      try {
        //console.log("this.product.id",this.product);
        const response = await axios.post(
          BASE_API + "stocks",
          {
            start: 0,
            limit: 100,
            idProducts: [this.product.id],
            idVariants: [idVar],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "e-token": etoken,
            },
          }
        );

        const stocks = response.data.stocks || [];
        this.stocks = 0;

        if (stocks.length > 0) {
          const productStock = stocks[0];

          // Compounds
          if (productStock.compounds?.length > 0) {
            this.stocks = Math.min(
              ...productStock.compounds.map((c) => c.quantity)
            );
          }
          // Normale
          else if (productStock.quantity) {
            this.stocks = productStock.quantity;
          }
          // Varianti
          else if (productStock.variants?.length > 0 && idVar !== null) {
            const matchingVariant = productStock.variants.find(
              (variant) => variant.externalid === idVar
            );
            this.stocks = matchingVariant?.qnt || 0;
          }
        }
      } catch (error) {
        console.error("Error during stock fetch:", error);
        this.stocks = 0;
      }
    },

    selectPush() {
      if (this.selectId) {
        this.getStock(this.selectId);
      }
    },

    getQntSub(idsub) {
      const item = this.stocks.find((item) => item.idProduct === idsub);
      return item ? item.quantity : 0;
    },

    formatPrice(value) {
      return Number(value).toFixed(2).replace(".", ",");
    },

    changeIndex(index) {
      this.slide = index;
    },

    selectSize(event, type) {
      const selectedEl = document.getElementsByClassName("bordersize");
      for (let i = 0; i < selectedEl.length; i++) {
        selectedEl[i].classList.remove("activeBorder");
      }
      event.currentTarget.classList.add("activeBorder");

      this.showMailForm = false;
      this.showMailFormTop = false;
      this.showMailFormBottom = false;

      const sizeElements = document.getElementsByClassName(type);
      for (let i = 0; i < sizeElements.length; i++) {
        sizeElements[i].classList.remove(type);
      }
      event.currentTarget.classList.add(type);

      this.subproducts = this.subproducts.filter(
        (typesub) => typesub.type !== type
      );
      this.subproducts.push({ id: event.currentTarget.id, type });
    },

    validateEmail(email) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    },

    async sendEmail() {
      if (this.mailAlert && this.validateEmail(this.mailAlert)) {
        try {
          await axios.post("notifyrestock", {
            idproduct: this.idProductMail,
            idparent:
              this.idProductMail === this.product.id ? null : this.product.id,
            name: `${this.product.name} ${this.nameSizeSelected}`,
            email: this.mailAlert,
          });

          Swal.fire({
            title:
              "You will receive an e-mail when the product will be restocked.",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#674e42",
          });
        } catch (error) {
          Swal.fire({
            title:
              error.response?.data?.error ||
              "Something went wrong. Check data or try later.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#674e42",
          });
        }
      }
    },

    checkFavourites(idprod) {
      let favs = localStorage.getItem("favs");
      this.checkFav = favs ? favs.includes(idprod) : false;
    },

    addToFavourites(idprod) {
      let favs = JSON.parse(localStorage.getItem("favs")) || [];
      if (favs.includes(idprod)) {
        favs = favs.filter((fav) => fav !== idprod);
      } else {
        favs.push(idprod);
      }
      localStorage.setItem("favs", JSON.stringify(favs));
      this.checkFavourites(idprod);
    },

    async addToCart() {
      const variantId = this.selectId;
      if (!variantId && (this.product.subproducts && this.product.subproducts.length === 0) && this.product.type !== "virtual") {
        Swal.fire({
          title: "Attenzione",
          icon: "error",
          html: "Devi selezionare la taglia prima di poter aggiungere il prodotto al carrello!",
          confirmButtonText: "Ok",
          confirmButtonColor: "#674e42",
          customClass: {
            title: "title-red",
            icon: "no-icon",
          },
        });
        return;
      }
      const cartData = {
        idproduct: this.product.id,
        idvariant: variantId,
        subproducts: this.subproducts,
        qnt: this.qnt,
        type: this.product.type || "product",
        gift: this.gift,
      };

      try {
        await this.$store.dispatch("addToCart", cartData, {
          headers: {
            "Content-Type": "application/json",
            "e-token": etoken,
          },
        });
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    },
  },
};
</script>

<style scoped>
.image-border {
  border: 1px solid #dedede;
}

.sold-out {
  color: red;
}

.available {
  color: green;
}

.product-quantity-slider input {
  border: 1px solid #000;
  width: 70px;
  height: 65px;
  border-radius: 0 !important;
}

.btn-cart {
  color: #fff;
  background-color: #000;
  border-radius: 0;
  border-color: #000;
  padding: 20px 40px 20px 40px !important;
  margin-left: 30px;
}

.btn-cart:hover {
  color: #000;
  background-color: #fff;
  border-color: #ba9457;
  padding: 20px 40px 20px 40px !important;
}

.category {
  color: #fff;
  border-radius: 0;
  margin-bottom: 25px;
  border-color: #000 !important;
  font-size: 20px;
}

.category a,
.category a:active,
.category a:focus {
  padding: 5px;
  background-color: #ba9457;
  text-decoration: none;
  color: #fff !important;
}

.category h5 {
  padding: 10px;
}

.product-title {
  font-size: 30px;
  font-weight: 900;
  color: #7a7a7a;
}

.product-discountprice {
  color: #ba9457 !important;
  font-weight: 900;
  font-size: 20px;
}

.product-price {
  color: #ba9457 !important;
  font-weight: 900;
  font-size: 30px;
}

.product-price del{
  font-size: 20px;
  color: #7a7a7a;
}

.form-control {
  padding: 10px;
  height: 50px;
}

.form-control:focus {
  outline: none;
  box-shadow: none;
  border-color: #ab2431;
}

.image {
  width: 100%;
}

.carousel {
  margin-top: 20px !important;
  width: 100%;
}

.carousel li {
  float: left;
  margin: 0;
  padding: 0;
  max-width: 125px;
}

.image-carousel {
  border: 1px solid #dedede;
  padding: 5px;
  width: 100%;
  height: auto;
}

.image-carousel:hover {
  cursor: pointer;
}

.single-product-details {
  margin-top: 30px;
}

.single-product-slider {
  align-items: center;
  justify-content: center;
}

.bordersize {
  border: 1px solid #000;
}

.bordersize:hover {
  cursor: pointer;
}

.product-description p {
  padding: 0 !important;
  margin-left: 0 !important;
}

.single-product-details .product-quantity > span {
  width: 65px;
}

.addtofavourites {
  background: #ffffff;
  border: 2px solid #744333;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 0px;
}

.redfav {
  color: #e20036;
}

.disclaimer-products{
  margin-top: 30px;
}

.disclaimer-products h5{
  color: #ba9457;
}

.description{
  color: #757575;
}

.description h4{
  color: #ba9457;
}

</style>
