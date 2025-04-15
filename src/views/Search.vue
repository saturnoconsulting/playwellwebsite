<template>
  <ShowProducts :search="true"/>
</template>
<script>


import ShowProducts from "@/components/ShowProducts.vue";

export default {
  name: "Search",
  components: {ShowProducts},
  computed:{
  }
}

</script>

<style scoped>

</style>


