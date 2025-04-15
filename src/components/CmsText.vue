<template>
  <div class="container">
    <div class="row">
      <!-- Dynamically apply column and custom classes -->
      <div :class="[data.columnb || 'col-12', data.classes]" v-html="data.text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Brand_",
  props: ["data"],
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
