<template>
  <section class="products related-products section shopping">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h3 class="text-center title-category text-uppercase">
            {{ nameCat }}
          </h3>
        </div>
      </div>
      <div class="row mt-4">
        <!-- Filtri a sinistra -->
        <div class="col-md-4 col-lg-3">
          <!-- Desktop view -->
          <div class="filters-desktop d-none d-md-block">
            <!--<div class="list-title mt-4">
              <h6 class="title-filter">BRANDS</h6>
            </div>
            <div class="scrollable">
              <template v-for="(tag, index) in tags" :key="index">
                <RouterLink :to="'/tag/' + tag.slug">
                  <div class="list-item" :class="{'selected-filter': filterTags.includes(tag.slug)}" v-show="['home', 'nuovo', 'fa22', 'ss25', 'fa20', 'fa24', 'sales', 'saldi', 'novita'].every(keyword => !tag.slug.includes(keyword))">@click="toggleTag(tag);"
                    {{formatTag(tag.slug)}}
                  </div>
                </RouterLink>
              </template>
            </div>
            Box scrollabile per le categorie
            <div class="list-title">
              <h6 class="title-filter">CATEGORIE</h6>
            </div>
            <div class="scrollable">
              <div class="categories" v-for="(cat, index) in categories" :key="index">
                <RouterLink :to="'/category/' + cat.slug">
                  <div class="list-item" :class="{ 'selected-filter': this.slugCategory === cat.slug }" @click="scrollTop">
                    <div v-html="cat.description"></div>
                  </div>
                </RouterLink>
              </div>
            </div>
            <hr class="mt-4 mb-4">-->
            <h5 class="mb-4">Filtri prodotti</h5>
            <button class="reset-button mb-4" v-show="checkResetButton" @click="resetFilters">Reset Filtri</button>
            <!--filtro categorie-->
            <div class="list-title">
              <h6 class="title-filter">CATEGORIE</h6>
            </div>
            <div class="scrollable">
              <div class="categories" v-for="(cat, index) in categories" :key="index">
                <div class="list-item" :class="{ 'selected-filter': this.filterCategories.includes(cat.slug)}" @click="toggleCategory(cat.slug);">
                  <div v-html="cat.description"></div>
                </div>
              </div>
            </div>
            <div class="list-title">
              <h6 class="title-filter">PREZZO</h6>
            </div>
            <div class="price-filter">
              <label for="min-price">Prezzo min:</label>
              <input class="form-control" type="number" id="min-price" min="0" v-model="minprice" placeholder="Es. 10" />
            </div>
            <div class="price-filter mb-4">
              <label for="max-price">Prezzo max:</label>
              <input class="form-control mt-1" type="number" id="max-price" min="0" v-model="maxprice" placeholder="Es. 100" />
            </div>
            <template v-for="(option, index) in options" :key="index">
              <div class="list-title">
                <h6 class="title-filter">{{option.description}}</h6>
              </div>
              <select class="form-control mb-4" v-model="selectValuesFilter[index]">
                <option value="">Seleziona valore</option>
                <template v-for="(value, key) in option.values" :key="key">
                  <option :value="value.trim()">{{value.trim()}}</option>
                </template>
              </select>
            </template>
            <button class="reset-button mb-3" v-show="checkResetButton" @click="resetFilters">Reset Filtri</button>
            <button class="apply-button mb-3" @click="applyFilters">Applica</button>
          </div>
          <!-- Mobile view -->
          <div class="filters-mobile d-block d-md-none">
            <button class="reset-button mb-4" v-show="checkResetButton" @click="resetFilters">Reset Filtri</button>
            <button class="btn btn-accordion mb-4" @click="toggleMobileFilters">
              Vedi filtri
            </button>
            <div v-show="mobileFiltersOpen" class="accordion">
              <!--<div class="list-title mt-4">
                <h6 class="title-filter">BRANDS</h6>
              </div>
              <div class="scrollable">
                <template v-for="(tag, index) in tags" :key="index">
                  <RouterLink :to="'/tag/' + tag.slug">
                    <div class="list-item" :class="{'selected-filter': filterTags.includes(tag.slug)}" v-show="['home', 'nuovo', 'fa22', 'ss25', 'fa20', 'fa24', 'sales','saldi','novita'].every(keyword => !tag.slug.includes(keyword))">
                      {{formatTag(tag.slug)}}
                    </div>
                  </RouterLink>
                </template>
              </div>
              <div class="list-title mt-4">
                <h6 class="title-filter">CATEGORIE</h6>
              </div>
              <div class="scrollable">
                <div class="categories" v-for="(cat, index) in categories" :key="index">
                  <RouterLink :to="'/category/' + cat.slug">
                    <div class="list-item" :class="{ 'selected-filter': this.slugCategory === cat.slug }" @click="scrollTop">
                      <div v-html="cat.description"></div>
                    </div>
                  </RouterLink>
                </div>
              </div>
              <hr class="mt-4 mb-4">-->
              <h5 class="mb-4">Filtri prodotti</h5>
              <!--filtro categorie-->
              <div class="list-title">
                <h6 class="title-filter">CATEGORIE</h6>
              </div>
              <div class="scrollable">
                <div class="categories" v-for="(cat, index) in categories" :key="index">
                  <div class="list-item" :class="{ 'selected-filter': this.filterCategories.includes(cat.slug)}" @click="toggleCategory(cat.slug);">
                    <div v-html="cat.description"></div>
                  </div>
                </div>
              </div>
              <div class="list-title">
                <h6 class="title-filter">PREZZO</h6>
              </div>
              <div class="price-filter">
                <label for="min-price">Prezzo min:</label>
                <input class="form-control" type="number" id="min-price" min="0" v-model="minprice" placeholder="Es. 10" />
              </div>
              <div class="price-filter mt-2 mb-4">
                <label for="max-price">Prezzo max:</label>
                <input class="form-control mt-1" type="number" id="max-price" min="0" v-model="maxprice" placeholder="Es. 100" />
              </div>
              <template v-for="(option, index) in options" :key="index">
                <div class="list-title">
                  <h6 class="title-filter">{{option.description}}</h6>
                </div>
                <select class="form-control mb-4" v-model="selectValuesFilter[index]">
                  <option value="">Seleziona valore</option>
                  <template v-for="(value, key) in option.values" :key="key">
                    <option :value="value.trim()">{{value.trim()}}</option>
                  </template>
                </select>
              </template>
              <button class="reset-button mb-4" v-show="checkResetButton" @click="resetFilters">Reset Filtri</button>
              <button class="btn apply-button mb-4" @click="applyFilters">Applica</button>
            </div>
          </div>
        </div>
        <!-- Prodotti a destra -->
        <div class="col-sm-12 col-md-8 col-lg-9">
          <div class="row">
            <template v-if="products.length > 0">
              <p class="mb-3">Visualizzazione di {{ products.length }} prodotti su {{ totalProducts }} risultati</p>
              <div class="col-6 col-md-6 col-lg-4 mb-4" v-for="product in products" :key="product.id">
                <SingleProduct :product="product" />
              </div>
            </template>
            <template v-else>
              <div v-if="!spinnerLoading" class="d-flex justify-content-center mt-5 mb-5">
                <p>Non ci sono prodotti</p>
              </div>
            </template>
            <div class="d-flex justify-content-center mt-5 mb-5">
              <div class="spinner spinner-border" role="status" v-if="spinnerLoading">
                <span class="visually-hidden"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import SingleProduct from "@/components/SingleProduct.vue";
import { etoken } from "@/constants/constants.js";

export default {
  name: "CategoryProducts",
  components: { SingleProduct },
  data() {
    return {
      mobileFiltersOpen: false,
      emptyMessage: false,
      slugCategory: this.$route.params.slugCategory ?? null,
      tag: this.$route.params.tag ?? null,
      filterTags: JSON.parse(localStorage.getItem('filterTags')) || [],//serve a capire quali tag sono selezionati
      filterCategories: JSON.parse(localStorage.getItem('filterCategories')) || [],//serve a capire quali categorie sono selezionate tramite slug
      nameCat : null,
      prevRoute: null,
      selectedCategoryId: null,
      minprice: null,
      maxprice: null,
      selectValuesFilter : JSON.parse(localStorage.getItem("filters")) ?? ["","",""]
    };
  },
  computed: {
    start() {
      return this.$store.getters.getStatusStart;
    },
    tags() {
      return this.$store.getters.getTags;
    },
    options() {//options delle varianti dei prodotti
      return this.$store.getters.getOptions;
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
    },
    checkResetButton() {
      return (!this.selectValuesFilter.every(item => item === "") || this.maxprice > 0 || this.minprice > 0
          || (!this.slugCategory && this.filterCategories.length !== 0) || (this.slugCategory && this.filterCategories.length > 1));
    }
  },
  created() {
    this.prevRoute = this.$router.options.history.state.forward;
  },
  beforeMount() {
    this.$store.dispatch("getCategories").then(() => {
      this.nameCategory();
    });
    this.$store.dispatch("getTags");
    this.$store.dispatch("getOptions");
  },
  mounted() {
    if (!this.prevRoute || !this.prevRoute.includes("/product/") || this.products.length === 0) {
        this.$store.commit("EMPTY_PRODUCTS");
        this.getProducts().then(() => {
          this.scrollTop();
        });
    }
    window.addEventListener("scroll", this.listener);
  },
  unmounted() {
    window.removeEventListener("scroll", this.listener);
  },
  methods: {
    toggleMobileFilters() {
      this.mobileFiltersOpen = !this.mobileFiltersOpen;
    },
    formatTag(slug){
      return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    resetFilters() {
      this.filterTags = [];
      this.filterCategories = [];
      this.selectValuesFilter = ["","",""];
      this.maxprice = null;
      this.minprice = null;
      localStorage.setItem('filters', JSON.stringify(this.selectValuesFilter));
      localStorage.setItem('filterTags', JSON.stringify(this.filterTags));
      localStorage.setItem('filterCategories', JSON.stringify(this.filterCategories));
      this.$store.commit("EMPTY_PRODUCTS");
      this.getProducts().then(() => {
        this.mobileFiltersOpen = false;
        this.scrollTop();
      });
    },
    toggleTag(tag) {
      const index = this.filterTags.indexOf(tag.slug); // Confronto con lo slug
      //index rappresenta la posizione dello slug all'interno dell'array filterTags. 
      // Se non è presente, il valore sarà -1.
      if (index === -1) {
        this.filterTags.push(tag.slug); // Aggiungi lo slug a filterTags
      } else {
        this.filterTags.splice(index, 1);  // Rimuovi lo slug da filterTags
      }
      localStorage.setItem('filterTags', JSON.stringify(this.filterTags));
      this.applyFilters();
    },
    toggleCategory(slugCat) {
      const index = this.filterCategories.indexOf(slugCat); // Confronto con lo slug
      //index rappresenta la posizione dello slug all'interno dell'array filterTags.
      // Se non è presente, il valore sarà -1.
      if (index === -1) {
        this.filterCategories.push(slugCat); // Aggiungi lo slug a filterCategories
      } else {
        this.filterCategories.splice(index, 1);  // Rimuovi lo slug da filterTags
      }
      localStorage.setItem('filterCategories', JSON.stringify(this.filterCategories));
      this.applyFilters();
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    async applyFilters() {
      this.$store.commit("EMPTY_PRODUCTS");
      localStorage.setItem("filters",JSON.stringify(this.selectValuesFilter));
      await this.getProducts().then(() => {
        this.toggleMobileFilters();
        this.scrollTop();
      });
    },
    nameCategory() {
      if(this.tag) {
        this.nameCat = this.formatTag(this.tag);
      }
      if(this.slugCategory){
        let cat = this.categories.filter((el) => el.slug === this.slugCategory);
        this.nameCat = cat.length > 0 ? cat[0].description : "Prodotti";
      }
    },
    async getProducts() {
      this.$store.dispatch("setSpinnerLoading", true);
      if(this.tag){//è lo slug dall'url
        const index = this.filterTags.indexOf(this.tag); // Covedo se c'é il tag
        if (index === -1) {
          this.filterTags.push(this.tag); // Aggiungi lo slug a filterTags
        }
      }
      if(this.slugCategory){//è lo slug category dall'url
        const index = this.filterCategories.indexOf(this.slugCategory); // Covedo se c'é il tag
        if (index === -1) {
          this.filterCategories.push(this.slugCategory); // Aggiungi lo slug a filterTags
          localStorage.setItem('filterCategories', JSON.stringify(this.filterCategories));
        }
      }
      await this.$store.dispatch("getProducts", {
        start: this.start,
        idsCategory: this.idsCategory || [],
        slugsCategory : this.filterCategories,
        minprice: this.minprice || null,
        maxprice: this.maxprice || null,
        tags: this.filterTags.length > 0 ? this.filterTags : [], // Passa solo gli slug selezionati
        filterOptions : this.selectValuesFilter.filter(value => value.trim() !== "").map(value => value.trim().toUpperCase())
      }, {
        headers: {
          "Content-Type": "application/json",
          "e-token": etoken,
        }
      }).finally(() => {
        this.$store.dispatch("setSpinnerLoading", false);
      });
    },

    listener() {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;
      let offset = window.innerWidth <= 768 ? 1200 : 500;
      if (scrollTop + clientHeight >= scrollHeight - offset) {
        if (this.products.length < this.totalProducts) {
          this.$store.dispatch("setSpinnerLoading", true);
          this.$store.dispatch("getProducts", {
            start: this.start,
            idsCategory: this.idsCategory || [],
            slugsCategory : this.filterCategories,
            minprice: this.minprice || null,
            maxprice: this.maxprice || null,
            tags: this.filterTags.length > 0 ? this.filterTags : [], // Passa solo gli slug selezionati
            filterOptions : this.selectValuesFilter.filter(value => value.trim() !== "").map(value => value.trim().toUpperCase())
          }).then(() => {
            this.$store.dispatch("setSpinnerLoading", false);
          });
        }
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  },
};

</script>

<style scoped>
.filters-desktop {
  display: block;
}

.filters-mobile {
  display: none;
}

.accordion {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  /*background-color: #f9f9f9;*/
}

@media (max-width: 768px) {
  .filters-desktop {
    display: none;
  }

  .filters-mobile {
    display: block;
  }
}

.selected-filter {
  padding: 10px;
  border: 2px solid #000 !important;
  font-weight: bold !important;
  border-radius: 6px !important;
}

.reset-button {
  width: 100%;
  border: 1px solid #000;
  padding: 3px;
  background-color: #fff;
  color: #000;
  text-align: center;
  font-weight: bold;
}

.reset-button:hover {
  cursor: pointer;
}

.apply-button {
  border: none;
  width: 100%;
  padding: 5px;
  background-color: #000;
  color: white;
  text-align: center;
  font-weight: bold;
}

.apply-button:hover {
  background-color: #7a7a7a;
  cursor: pointer;
}

.form-control {
  height: 35px;
  border: none;
  border-radius: 0;
  background-color: #f7f7f7;
}

.btn-accordion {
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 5px;
  border: none !important;
  border-radius: 0;
  background-color: #f1c67b;
  color: white;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-accordion:hover, .btn-accordion:active {
  background-color: #deac57;
  color: white;
}

.title-filter {
  font-weight: bold;
  text-align: center;
  padding: 5px;
  background-color: #7a7a7a;
  color: #fff;
  margin-bottom: 20px;
}

.title-category {
  padding: 5px;
  margin-top: 25px;
  border: 1px solid black;
  background-color: #000;
  color: white;
  font-size: 20px;
}

.list-item{
  cursor: pointer;
  padding: 5px;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-weight: 500;
  text-align: center;
}

.list-item:hover {
  background-color: #e2e6ea;
}

.list-title h5 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.scrollable{
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
}

select{
  padding: 10px !important;
}

/* Responsività mobile */
@media (max-width: 768px) {
  .reset-button {
    width: 100%;
    background-color: transparent;
    color: black;
    text-align: center;
    font-weight: bold;
  }

  .reset-button:hover {
    font-weight: bold;
    cursor: pointer;
  }

  .col-md-6 {
    margin-bottom: 20px;
  }

  .categories-scrollable {
    margin-bottom: 5px !important;
  }
}
</style>
