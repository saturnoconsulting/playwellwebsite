<template>
  <!-- Se è la pagina home carica prima gli hooks e poi i proodotti  -->
  <template v-for="page in filteredPageData" :key="page.id">
    <template v-if="page.content != null">
      <div class="pageview">
        <div v-html="page.content"></div>
      </div>
    </template>
    <template class="pageview" v-else>
      <template v-for="component in page.components" :key="component.id">
        <template v-if="component.type === 'slider'">
          <Slider :data="component.files"/>
        </template>
        <template v-else-if="component.type === 'carousel'">
          <Carousel :data="component.files"/>
        </template>
        <template v-else-if="component.type === 'text'">
          <Text :data="component"/>
        </template>
        <template v-else-if="component.type === 'image'">
          <CmsImage :data="component"/>
        </template>
        <template v-else-if="component.type === 'accordion'">
          <CmsAccordion :data="component"/>
        </template>
      </template>
    </template>
    <template v-if="isHomePage">
      <ShowBoxCategories/>
      <ShowProducts/>
      <ShowBanner/>
      <!--<ShowBoxApp/>-->
      <ShowContacts/>
    </template>
  </template>

</template>

<script>
import Slider from "@/components/CmsSlider.vue";
import Carousel from "@/components/CmsCarousel.vue";
import Text from "@/components/CmsText.vue";
import CmsAccordion from "@/components/CmsAccordion.vue";
import CmsImage from "@/components/CmsImage.vue";
import Image from "@/components/Image.vue";
import ShowProducts from "@/components/ShowProducts.vue";
import ShowContacts from "@/components/ShowContacts.vue";
import ShowBoxCategories from "@/components/ShowBoxCategories.vue";
import ShowBoxApp from "@/components/ShowBoxApp.vue";
import ShowBanner from "@/components/ShowBanner.vue";

export default {
  props: ['pageData', 'pageTitle', 'imageUrl', 'homeImage'],
  watch: {
    pageTitle(newTitle) {
      document.title = newTitle;
    },
  },
  components: {
    ShowBanner,
    ShowBoxApp,
    ShowBoxCategories: ShowBoxCategories,
    ShowContacts,
    CmsImage,
    CmsAccordion,
    Text,
    Slider,
    Carousel,
    Image,
    ShowProducts,
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    filteredPageData() {
      const filteredData = this.pageData.find(page => page.slug === this.$route.path);
      //console.log("filteredData", filteredData);
      return filteredData ? [filteredData] : [];
    },
  },
};
</script>

<style>

</style>
