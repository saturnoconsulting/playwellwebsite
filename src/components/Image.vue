<template>
  <div class="container-fluid text-center" >
    <!-- Mostra lo spinner se isLoadingImage è true -->
    <Spinner/>
    <!-- Mostra l'immagine solo se isLoadingImage è false -->
    <img class="img-fluid" :src="filteredImageUrl" >
  </div>
</template>

<script>


import Spinner from "@/components/Spinner.vue";

export default {
  name: "Image",
  components: {
    Spinner
  },
  created() {
    this.$store.dispatch("components");
  },
  computed: {
    // Calcola l'URL dell'immagine filtrata
    filteredImageUrl() {
      if (this.$store.state.pageData) {
        const imageComponent = this.findImageComponent(this.$store.state.pageData);
        // Controlla se imageComponent è valido e se ha files
        if (imageComponent && imageComponent.files && imageComponent.files.length > 0) {
          // Restituisci l'URL dell'immagine se presente, altrimenti restituisci null
          return imageComponent.files[0].url;
        }
      }
    },
  },
  methods: {
    // Trova il componente "Immagine_home"
    findImageComponent(components) {
      //trova l'immagine associata alla home
      for (const component of components) {
        //fa una ricerca ricorsiva cosi da controllare tutti i livelli
        // dei dati passati fino a quando non trova il nome giusto
        if (component.slug === "/immagine_home") {
        //  console.log("home",component);
          return component;
        }
        if (component.components && component.components.length > 0) {
          const imageComponent = this.findImageComponent(component.components);
          if (imageComponent) {
            return imageComponent;
          }
        }
      }
      return null;
    },
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: #fff;
  text-align: center;
  padding-top: 130px;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.container-fluid img {
  margin: 0 auto;
  width: 100%;
  max-width: 3162px;
  display: block;
}
</style>
