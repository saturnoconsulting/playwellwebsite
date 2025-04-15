<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-6 mb-4" v-for="(cat, index) in this.categories" :key="index">
        <RouterLink :to="'/category/'+ cat.slug">
          <div class="card">
            <div class="card-body" v-bind:style="{ backgroundImage: 'url(' + (cat.imageUrl ?? '../../images/categoria.jpg') + ')' }">
              <div class="overlay"></div>
              <div class="card-img-overlay d-flex flex-column justify-content-center">
                <div class="top-left-text">{{cat.description}}</div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBoxCategories",
  data() {
    return {
      categories: null
    }
  },
  mounted() {
    this.$store.dispatch("getCategories").then(() => {
      const categories = this.$store.getters.getCategories;
      if (categories) {
        // Limita le categorie a 4
        this.categories = categories.slice(0, 8);
      }
    });
  }
}

</script>

<style scoped>
.card {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 250px;
  overflow: hidden;
  transition: transform 0.3s;
  border-radius: 0 !important;
}

.card-body {
  background-position: center center;
  background-size: cover;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.card:hover {
  z-index: 2;
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 1;
}

.card-img-overlay {
  color: white;
  z-index: 1;
  text-align: center;
  font-weight: bold;
}

.top-left-text {
  padding: 10px;
}

</style>