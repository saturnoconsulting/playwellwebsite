<template>
  <div :class="[data.columnb, data.classes]">
      <img v-for="image in data.files" :key="image.id" :src="image.url" :alt="image.alt" :class="{ 'max-width': data.columnb }" />
    </div>
</template>

<script>
export default {
  name: "CmsImage",
  props: ['data'],
};
</script>

<style>
.max-width {
  max-width: 100%;
  margin-bottom: 50px;
}
</style>

