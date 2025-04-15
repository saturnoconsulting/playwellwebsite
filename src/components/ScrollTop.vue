<template>
  <div class="scroll-top" v-on:click="scrollToTop" v-if="scrolled">
    <font-awesome-icon class="icon-scroll-top" icon="angle-up" size="lg"/>
  </div>
</template>
<script>
export default {
  name: 'ScrollTop',
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      scrolled: false
    }
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
</script>

<style>
.scroll-top{
  background-color: #000 !important;
}

.icon-scroll-top{
  align-content: center;
}
</style>