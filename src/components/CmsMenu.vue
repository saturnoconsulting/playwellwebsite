<template>
  <div>
    <div class="btn-menu" @click="toggleMenu()">
      <font-awesome-icon icon="bars" style="color: #000;" />
    </div>
    <div class="menu-overlay" @click="toggleMenu()" :class="{ active: isOpen }"></div>
    <div class="sidebarmenu" :class="{ active: isOpen }">
      <div class="closemenu" @click="toggleMenu()">
        <font-awesome-icon icon="remove" />
      </div>
      <div class="d-flex justify-content-around menutop mt-3 mb-3">
        <router-link to="/favourites" @click="toggleMenu()" class="link">
          <font-awesome-icon :icon="['far', 'heart']" />
        </router-link>
        <router-link to="/cart" @click="toggleMenu()">
          <div class="icon-cart">
            <font-awesome-icon icon="fa-bag-shopping" />
            <span class="badge badgecart">{{ totalProductsCart }}</span>
          </div>
        </router-link>
      </div>
      <ul class="menu">
        <li v-for="(menuItem, index) in sidebarmenu.menuitems" :key="menuItem.id">
          <template v-if="menuItem.itemschild?.length">
            <li class="text-uppercase menu-item parentMenu" @click="toggleAccordion(index)">
              {{ menuItem.name }}
              <svg v-if="activeAccordion !== index" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path
                  d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414L8 10.414 4.293 6.707a1 1 0 0 1 0-1.414z" />
              </svg>
              <svg v-if="activeAccordion === index" fill="#84594a" height="8" width="10" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-19.8 -19.8 369.60 369.60" xml:space="preserve"
                stroke="#84594a" stroke-width="60">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                  stroke-width="1.98"></g>
                <g id="SVGRepo_iconCarrier">
                  <path id="XMLID_224_"
                    d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z">
                  </path>
                </g>
              </svg>
            </li>
            <div class="accordion" v-show="activeAccordion === index">
              <ul>
                <li v-for="(child, childIndex) in menuItem.itemschild" :key="childIndex">
                  <template v-if="isExternalLink(child.link)">
                    <a
                        :href="child.link"
                        target="_blank"
                        @click="toggleMenu"
                        class="text-uppercase ms-4 mb-0"
                    >
                      {{ child.name }}
                    </a>
                  </template>
                  <template v-else>
                    <router-link
                        :to="child.link"
                        @click="toggleMenu"
                        class="text-uppercase ms-4 mb-0"
                    >
                      {{ child.name }}
                    </router-link>
                  </template>
                  <!--<router-link :to="child.link" @click="toggleMenu()" class="text-uppercase ms-4 mb-0">
                    {{ child.name }}
                  </router-link>-->
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <template v-if="isExternalLink(menuItem.link)">
              <a
                  :href="menuItem.link"
                  target="_blank"
                  @click="toggleMenu"
                  class="btn btn-accordion w-100 text-uppercase"
              >
                {{ menuItem.name }}
              </a>
            </template>
            <template v-else>
              <router-link
                  :to="menuItem.link"
                  @click="toggleMenu"
                  class="btn btn-accordion w-100 text-uppercase"
              >
                {{ menuItem.name }}
              </router-link>
            </template>
            <!--<router-link :to="menuItem.link" @click="toggleMenu()" class="btn btn-accordion w-100 text-uppercase">
              {{ menuItem.name }}
            </router-link>-->
          </template>
        </li>
        <li v-if="!isAuth">
          <router-link to="/login" @click="toggleMenu()">
            ACCEDI/REGISTRATI
          </router-link>
        </li>
        <template v-else>
          <li>
            <router-link to="/userarea" @click="toggleMenu()">
              {{ user?.name }}
            </router-link>
          </li>
          <li>
            <a @click="logout()">
              Logout
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import {BASE_API, cartIDkey, etoken, IDSALESPOINT, PATH_APP} from "@/constants/constants.js";
import axios from "axios";

export default {
  props: ['sidebarmenu'],
  data() {
    return {
      isOpen: false,
      activeAccordion: null,
      user: null,
    };
  },
  computed: {
    totalProductsCart() {
      return this.$store.getters.getStatusTotalProdsCart;
    },
    isAuth() {
      return this.$store.getters.getAuth;
    },
  },
  beforeMount() {
    this.getTotalProdsCart();
    let user = localStorage.getItem("user");
    if (user && user !== "null") {
      this.user = JSON.parse(user);
    } else {
      //questa linea di codice non serve perché se non c'é l'utente è già stato fatto il logout
      //this.logout();
    }
  },
  methods: {
    async getTotalProdsCart() {
      let idcart = localStorage.getItem(cartIDkey);
      let token = localStorage.getItem("token");
      //console.log("token", token);
      await axios.get(BASE_API + "cart?type=website&idcart=" + idcart + "&idsalespoint=" + IDSALESPOINT, {
        headers: { Authorization: `Bearer ${token}`, 'e-token': etoken }
      }).then(resp => {
        this.$store.commit('SET_TOTAL_PRODSCART', resp.data.totalProdsCart);
      }).catch(function (error) {
        if (error.response.status === 404) {
          localStorage.removeItem(cartIDkey);
        } else {
          console.log(error);
        }
      });
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    toggleAccordion(index) {
      this.activeAccordion = this.activeAccordion === index ? null : index;
    },
    logout() {
      this.$store.dispatch('Logout');
      this.toggleMenu();
    },
    isExternalLink(link) {
      return /^(http|https):\/\//.test(link);
    }
  },
};
</script>


<style scoped>

.icon-cart {
  text-decoration: none;
}

.badgecart {
  display: block;
  background-color: #000;
  position: relative;
  max-width: 25px;
  height: 100%;
  font-size: 12px;
  padding: 0;
  top: -17px;
}

.parent {
  text-align: center;
}

.active {
  display: block !important;
}

.sidebarmenu {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 999;
  overflow: scroll;
}

.btn-menu svg {
  font-size: 28px;
}

.btn-menu svg:hover {
  cursor: pointer;
}

.menu-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: none;
}

.menu {
  padding: 10px !important;
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: center;
  width: 100%;
}

.menu li {
  width: 80%;
  text-align: left;
}

.menu .accordion li {
  width: 80%;
  text-align: left;
  border-bottom: none;
  /* Modifica questa parte */
}

.menu-item {
  font-weight: 800;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #000 !important;
  font-size: 18px;
  text-align: left;
}

.menu-item:hover {
  cursor: pointer;
}

.menu li a {
  font-weight: 800;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 0;
  font-size: 18px;
  text-align: left;
}

.closemenu {
  text-align: center;
  padding: 30px;
}

.closemenu svg {
  font-size: 30px;
}

.closemenu:hover {
  cursor: pointer;
}

.search {
  padding: 20px;
  font-size: 18px;
  border: none;
}

.menubottom {
  margin-top: 20px;
  padding: 10px !important;
  position: relative;
  display: block;
  list-style: none;
  overflow: hidden;
  margin-bottom: 0;
}

.menubottom li {
  border: none;
}

.menutop svg {
  font-size: 25px;
}

.socialmenu {
  overflow: hidden;
  width: 100%;
  padding: 10px !important;
}

.socialmenu li a {
  text-align: center;
}

.socialmenu li {
  border-bottom: 0;
}

.socialmenu svg {
  width: 50px;
}
</style>