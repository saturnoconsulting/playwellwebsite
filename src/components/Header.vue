<template>
  <div class="header">
    <section class="top-header">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <div class="search">
            <router-link to="/search">
              <font-awesome-icon icon="search" />
            </router-link>
          </div>
          <div class="logo">
            <router-link to="/">
              <img class="logo-main" :src="'/images/playwell-logo.png'">
            </router-link>
          </div>  
          <div class="menu d-flex align-items-center">
            <CmsMenu :sidebarmenu="sidebarmenu"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CmsMenu from "@/components/CmsMenu.vue";

export default {
  name: "Header",
  props: ['menus', 'sidebarmenu'],
  data() {
    return {}
  },
  components: {
    CmsMenu,
  },
  beforeMount() {

  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.logo-main {
  max-width: 150px;
}

.header {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 3;
}

.topbar {
  background-color: #ab2431;
  width: 100%;
  color: #ffffff;
  padding: 5px;
  overflow: hidden;
  font-size: 10px;
  font-weight: bold;
}

.top-header .container .row {
  display: flex;
  align-items: center;
}

.menu-item {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-item:hover .dropdown-menu {
  display: block;
}

.top-menu {
  padding-top: 26px !important;
}

@media (max-width: 768px) {
  .top-menu {
    padding-top: 35px !important;
  }
}

.top-menu svg {
  color: #000;
  font-size: 28px;
}

.search{
  font-size: 26px;
}

</style>
