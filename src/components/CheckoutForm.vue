<template>
  <form class="checkout-form" @submit.prevent="checkForm">
    <div class="row">
      <div class="col-lg-8">
        <h4 class="widget-title">Email</h4>
        <div class="row mb-5 shipping-details">
          <small class="mb-3">(Questa è la mail del tuo account)</small>
          <div class="col-lg-12">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" name="email" v-model="email"/>
            </div>
          </div>
        </div>
        <h4 class="widget-title">Indirizzo di spedizione</h4>
        <div
          class="alert alert-danger mt-3"
          v-if="errors.length > 0"
          v-for="error in errors"
        >
          {{ error }}
        </div>
        <div class="row mb-5 shipping-details">
          <div class="col-lg-6">
            <div class="form-group">
              <label for="name">Nome</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="shipping.name"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="surname">Cognome</label>
              <input
                type="text"
                class="form-control"
                id="surname"
                name="surname"
                v-model="shipping.surname"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label for="street">Via</label>
              <input
                type="text"
                class="form-control"
                id="street"
                name="address"
                v-model="shipping.address"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label for="street_number">Num. civ.</label>
              <input
                type="text"
                class="form-control"
                id="street_number"
                name="numciv"
                v-model="shipping.numciv"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group">
              <label for="user_post_code">CAP</label>
              <input
                type="text"
                class="form-control"
                id="user_post_code"
                name="zipcode"
                v-model="shipping.cap"
                maxlength="7"
                v-on:change="checkCap(shipping.cap)"
              />
            </div>
          </div>
          <div class="col-lg-8">
            <div class="form-group">
              <label for="user_city">Città</label>
              <input
                type="text"
                class="form-control"
                id="user_city"
                name="city"
                v-model="shipping.city"
              />
            </div>
          </div>
          <div
            class="col-lg-6"
            v-if="shipping.country === 'Italy' || shipping.country === 'Canada'"
          >
            <div class="form-group">
              <label for="prov">Provincia</label>
              <input
                type="text"
                class="form-control"
                id="prov"
                name="prov"
                maxlength="2"
                v-model="shipping.prov"
              />
            </div>
          </div>
          <div class="col-lg-6" v-if="shipping.country === 'Brazil'">
            <div class="form-group">
              <label for="cpf">C.P.F.</label>
              <input
                type="text"
                class="form-control"
                id="cpf"
                name="cpf"
                maxlength="11"
                v-model="shipping.cpf"
              />
            </div>
          </div>
          <div class="col-lg-6" v-if="shipping.country === 'Qatar'">
            <div class="form-group">
              <label for="cpf">ID number</label>
              <input
                type="text"
                class="form-control"
                id="IDnumber"
                name="IDnumber"
                maxlength="11"
                v-model="shipping.IDnumber"
              />
            </div>
          </div>
          <div class="col-lg-6" v-if="shipping.country === 'Romania'">
            <div class="form-group">
              <label for="cpf">Paese</label>
              <input
                type="text"
                class="form-control"
                id="county"
                name="county"
                v-model="shipping.county"
                v-on:change="getShippingPrice"
              />
            </div>
          </div>
          <div class="col-lg-6" v-if="shipping.country === 'Turkey'">
            <div class="form-group">
              <label for="cpf">Turkish ID</label>
              <input
                type="text"
                class="form-control"
                id="turkishID"
                name="turkishID"
                v-model="shipping.turkishID"
              />
            </div>
          </div>
          <div class="col-lg-6" v-if="shipping.country === 'United States'">
            <div class="form-group">
              <label for="cpf">Stato</label>
              <input
                type="text"
                class="form-control"
                id="stateUS"
                name="stateUS"
                v-model="shipping.stateUS"
              />
            </div>
          </div>
          <div
            :class="
              shipping.country === 'Italy' ||
              shipping.country === 'Canada' ||
              shipping.country === 'Brazil' ||
              shipping.country === 'Qatar' ||
              shipping.country === 'Romania' ||
              shipping.country === 'Turkey' ||
              shipping.country === 'United States'
                ? 'col-lg-6'
                : 'col-lg-12'
            "
          >
            <div class="form-group">
              <label for="shipping_country">Paese</label>
              <select
                class="form-control"
                id="shipping_country"
                v-model="shipping.country"
                v-on:change="getShippingPrice">
                <option v-bind:value="country" v-for="country in this.countries">
                  {{ country }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label for="user_phone">Telefono</label>
              <input
                type="text"
                class="form-control"
                id="user_phone"
                v-model="shipping.phone"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-check">
              <input
                class="form-check-input checkbox-primary"
                type="checkbox"
                id="sameaddress"
                v-model="sameaddress"
              />
              <label class="form-check-label" for="sameaddress">
                Stesso indirizzo per la fattura
              </label>
            </div>
          </div>
        </div>
        <h4 class="widget-title" v-if="!sameaddress">
          Indirizzo di fatturazione
        </h4>
        <div class="row mb-5 billing-details" v-if="!sameaddress">
          <div class="col-lg-6">
            <div class="form-group">
              <label>Azienda</label>
              <input
                type="text"
                class="form-control"
                name="company"
                v-model="billing.company"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="full_name">VAT Number</label>
              <input
                type="text"
                class="form-control"
                name="vatnumber"
                v-model="billing.vatnumber"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group">
              <label for="full_name">SDI Code</label>
              <input
                type="text"
                class="form-control"
                name="sdicode"
                v-model="billing.sdicode"
              />
            </div>
          </div>
          <div class="col-lg-8">
            <div class="form-group">
              <label for="full_name">PEC</label>
              <input
                type="text"
                class="form-control"
                name="pec"
                v-model="billing.pec"
              />
            </div>
          </div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-7">
            <div class="form-group">
              <label for="user_address">Via</label>
              <input
                type="text"
                class="form-control"
                v-model="billing.address"
              />
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-5">
            <div class="form-group">
              <label for="full_name">Numero</label>
              <input
                type="text"
                class="form-control"
                v-model="billing.numciv"
              />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group">
              <label for="user_post_code">CAP</label>
              <input
                type="text"
                class="form-control"
                maxlength="7"
                v-model="billing.cap"
                @input="getShippingPrice"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="user_city">CITTÀ</label>
              <input type="text" class="form-control" v-model="billing.city" />
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group">
              <label for="user_city">Stato/Prov</label>
              <input
                type="text"
                class="form-control"
                maxlength="2"
                v-model="billing.prov"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="user_country">Telefono</label>
              <input type="text" class="form-control" v-model="billing.phone" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="billing_country">Paese</label>
              <select
                class="form-control"
                id="billing_country"
                v-model="billing.country"
              >
                <option
                  v-bind:value="country"
                  v-for="country in this.countries"
                >
                  {{ country }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-lg-12">
            <h4 class="widget-title">Altre modalità di spedizione</h4>
            <div class="form-check" v-if="this.showonehourshipping">
              <input
                v-on:change="getShippingPrice"
                class="form-check-input"
                type="checkbox"
                id="onehourshipping"
                v-model="onehourshipping"
              />
              <label class="form-check-label" for="onehourshipping">
                Spedizione in un'ora (opzionale)<br />
                <p>(disponibile dalle 16:45)</p>
              </label>
            </div>
            <div class="form-check">
              <input
                v-on:change="getShippingPrice"
                class="form-check-input"
                type="checkbox"
                id="localpickup"
                v-model="localpickup"
              />
              <label class="form-check-label" for="localpickup">
                Ritiro in sede (opzionale)
              </label>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <h4 class="widget-title">Note aggiuntive</h4>
          <div class="col-lg-12">
            <div class="form-group">
              <textarea class="form-control" v-model="notes"></textarea>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row mb-5">
            <h4 class="widget-title">Metodi di pagamento</h4>
            <!--div-- class="d-flex flex-row pb-3">
              <div class="d-flex align-items-center pe-2">
                <input class="form-check-input" type="radio" name="payment" id="braintree" value="braintree"
                       v-model="paymentType" @change="handlePaymentTypeChange" @click="showmodalbonifico"/>
              </div>
              <div class="rounded border d-flex w-100 p-3 align-items-center">
                <p class="mb-0">
                  <i class="fab fa-cc-visa fa-lg text-primary pe-2"></i>
                  Carta di credito
                </p>
              </div>
            </div-->
            <!--<div class="d-flex flex-row pb-3">
              <div class="d-flex align-items-center pe-2">
                <input class="form-check-input" type="radio" name="payment" id="paypal" value="paypal" v-model="paymentType"
                       @change="handlePaymentTypeChange"/>
              </div>
              <div class="rounded border d-flex w-100 p-3 align-items-center">
                <label for="paypal" class="mb-0">
                  Paypal / Carta di credito
                </label>
              </div>
            </div>-->
            <div class="d-flex flex-row pb-3">
              <div class="d-flex align-items-center pe-2">
                <input class="form-check-input" type="radio" name="payment" id="stripe" value="stripe" v-model="paymentType"
                  @change="handlePaymentTypeChange"/>
              </div>
              <div class="rounded border d-flex w-100 p-3 align-items-center">
                <label for="stripe" class="mb-0">
                  Carta di credito
                </label>
              </div>
            </div>
            <!--<div class="d-flex flex-row pb-3">
              <div class="d-flex align-items-center pe-2">
                <input class="form-check-input" type="radio" name="payment" id="bank" value="bank" v-model="paymentType"
                  @change="handlePaymentTypeChange"/>
              </div>
              <div class="rounded border d-flex w-100 p-3 align-items-center">
                <label for="bank" class="mb-0">
                  Bonifico bancario (Ti invieremo le coordinate via e-mail)
                </label>
              </div>
            </div>-->
            <!--<div class="d-flex flex-row pb-3">
              <div class="d-flex align-items-center pe-2">
                <input class="form-check-input" type="radio" name="payment" id="cod" value="cod" v-model="paymentType"
                       @change="handlePaymentTypeChange"/>
              </div>
              <div class="rounded border d-flex w-100 p-3 align-items-center">
                <label for="cod" class="mb-0">
                  Contrassegno (Paga direttamente al corriere in contanti)
                </label>
              </div>
            </div>
            <div class="alert alert-primary" role="alert" v-if="showAlert">
              Effettua il pagamento tramite bonifico bancario. Usa il numero
              dell’ordine come causale. Il tuo ordine non verrà spedito finché il
              pagamento non risulterà trasferito sul nostro conto corrente.
            </div>-->
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="product-checkout-details">
          <h4 class="widget-title">Riassunto dell'ordine</h4>
          <div class="discount-code" style="border-top: 0px">
            <p>Gift card/Promo code</p>
            <div class="form-group input-group">
              <input type="text" class="form-control" v-model="discountCode" />
              <div class="input-group-append">
                <button class="btn btn-apply" type="button" v-on:click="applyDiscountCode" :class="applyDiscount ? 'disabled' : ''">
                  Applica
                </button>
              </div>
            </div>
            <br />
          </div>
          <ul class="summary-prices">
            <li>
              <span>Subtotale:</span>
              <span class="price">{{ formatPrice(this.subtotal) }}</span>
            </li>
            <li>
              <span>Sconto:</span>
              <span>{{ formatPrice(this.discount) }}</span>
            </li>
            <li v-if="this.gifts > 0">
              <span>Gifts:</span>
              <span>{{ formatPrice(this.gifts) }}</span>
            </li>
            <li>
              <span>Spedizione:</span>
              <span>{{ formatPrice(this.totalshipping) }}</span>
            </li>
            <li v-if="paymentType === 'cod'">
              <span>Contrassegno:</span>
              <span>10,00</span>
            </li>
          </ul>
          <div class="summary-total">
            <span>TOTALE</span>
            <span>{{ formatPrice(this.total) }}</span>
          </div>
          <button type="submit" class="btn btn-brand mt-20">
            Completa l'ordine
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import router from "@/router";
import axios from "axios";
import Swal from "sweetalert2";
import {cartIDkey, etoken, IDSALESPOINT, codPrice} from "@/constants/constants.js";

export default {
  name: "CheckoutForm",
  data() {
    return {
      localpickup: false,
      onehourshipping: false,
      showonehourshipping: false,
      idcart: null,
      paymentType: null,
      sameaddress: true,
      user: null,
      subtotal: 0,
      totalshipping: 0,
      discount: 0,
      gifts: 0,
      total: 0,
      email: null,
      shipping: {
        address: null,
        numciv: null,
        cap: null,
        city: null,
        prov: null,
        phone: null,
        country: null,
      }, //indirizzo di spedizione
      billing: {}, //indirizzo di fatturazione
      discountCode: null, //codice sconto
      applyDiscount: false, //variabile che disattiva pulsante apply
      notes: null,
      errors: [],
      showAlert: false,
      countries: [
        "Italy"
      ],
    };
  },
  computed:{
    spinnerLoading(){
      return this.$store.getters.getStatusSpinnerLoading;
    },
  },
  async beforeMount() {
    await this.updateDataUser();
    await this.getCart();
    await this.getShippingPrice();
  },
  methods: {
    handlePaymentTypeChange() {
      if (this.paymentType === "stripe") {
        this.showAlert = false;
        this.total = this.subtotal + this.totalshipping;
      } else if (this.paymentType === "paypal") {
        this.showAlert = false;
        this.total = this.subtotal + this.totalshipping;
      }else if (this.paymentType === "bank") {
        this.showAlert = true;
        this.total = this.subtotal + this.totalshipping;
      } else if (this.paymentType === "cod") {
        //il contrassegno genera sovrapprezzo
        this.showAlert = false;
        this.total = this.subtotal + this.totalshipping + codPrice;
      }
    },
    async updateDataUser() {
      //attenzione che va a modificare il localstorage che serve anche al menu cms
      this.$store.commit("showSpinner");
      let token = localStorage.getItem("token");
      await axios
        .get("user", {
          headers: { Authorization: `Bearer ${token}`, "e-token": etoken },
        })
        .then((res) => {
          this.$store.commit("hideSpinner");
          let user = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          this.email = user.email;
          this.shipping.name = user.name;
          this.shipping.surname = user.surname;
          this.shipping.address = user.address;
          this.shipping.numciv = user.numciv;
          this.shipping.cap = user.cap;
          this.shipping.city = user.city;
          this.shipping.prov = user.prov;
          this.shipping.phone = user.phone;
          this.shipping.country = user.country;
        })
        .catch((error) => {
          this.$store.commit("hideSpinner");
          if (error.response.status === 400) {
            Swal.fire({
              title: error.response.data.error
                ? error.response.data.error
                : "Technical problems on input data. Check your checkout fields.",
              icon: "error",
              confirmButtonText: "Ok",
              confirmButtonColor: "#e20036",
            });
            console.log(error);
          } else {
            console.log(error);
          }
        });
    },
    checkForm() {
      this.errors = [];
      if (!this.email ||
        !this.shipping.name ||
        !this.shipping.surname ||
        !this.shipping.address ||
        !this.shipping.cap ||
        !this.shipping.city ||
        !this.shipping.phone ||
        !this.shipping.country) {
        this.errors.push("Ci sono dei campi obbligatori, si prega di ricontrollare i campi del form.");
      }
      if ((this.shipping.country === "Italy" && !this.shipping.prov) ||
        (this.shipping.country === "Canada" && !this.shipping.prov)) {
        this.errors.push("Devi inserire la provincia.");
      }
      if(!this.paymentType){
        this.errors.push("Devi scegliere un metodo di pagamento.");
      }
      if (!this.shipping.numciv) {
        this.errors.push("Inserire il numero civico. Si prega di inserire snc se non esiste.");
      }
      if ((this.shipping.country === "Italy" || this.shipping.country === "Canada") &&
          this.shipping.prov && this.shipping.prov.length > 2) {
        //per la spagna e altri paesi non ci sono province
        this.errors.push("Il campo prov deve avere due caratteri.");
      }
      if (this.errors.length === 0) {
        this.placeOrder();
      }
    },
    formatPrice(value) {
      return Number(value / 100)
        .toFixed(2)
        .replace(".", ",");
    },
    async getCart() {
      this.$store.commit("showSpinner");
      let idcart = localStorage.getItem(cartIDkey);
      let token = localStorage.getItem("token");
      await axios.get("cart?type=website&idcart=" + idcart + "&idsalespoint=" + IDSALESPOINT, {
          headers: { Authorization: `Bearer ${token}`, "e-token": etoken },
        }).then((resp) => {
          this.$store.commit("hideSpinner");
          if (!resp.data.cart.lineItems.length) {
            router.push("/");
          } else {
            this.idcart = resp.data.cart.id;
            this.total = resp.data.cart.totals.total;
            this.totalshipping = resp.data.cart.totals.shipping;
            this.gifts = resp.data.cart.totals.gifts;
            this.subtotal = resp.data.cart.totals.subtotal;
            this.discount = resp.data.cart.totals.discount;
            if (this.shipping.cap) {
              //ottengo costo spedizioni
              //this.getShippingPrice();
            }
          }
        }).catch((error) => {
          this.$store.commit("hideSpinner");
          console.log(error);
        });
    },
    async checkCap(cap) {
      let token = localStorage.getItem("token");
      await axios.get("checkcap/" + cap, {
          headers: { Authorization: `Bearer ${token}`, "e-token": etoken },
        }).then((resp) => {
          //console.log("resp checkcap", resp);
          if (resp.data !== "") {
            this.showonehourshipping = true;
          } else {
            this.showonehourshipping = false;
          }
        }).catch((error) => {
          this.showonehourshipping = false;
          //console.log("CHECKCAP", error);
        });
    },
    async getShippingPrice() {
      let token = localStorage.getItem("token");
      let shippingType;
      if (this.onehourshipping) {
        shippingType = "onehourshipping";
      } else if (this.localpickup) {
        shippingType = "localpickup";
      } else {
        shippingType = "standard";
      }
      await this.checkCap(this.shipping.cap);
      await axios
        .post(
          "getshippingprice",
          {
            total: this.total,
            address: {
              address: this.shipping.address,
              numciv: this.shipping.numciv,
              cap: this.shipping.cap,
              city: this.shipping.city,
              prov: this.shipping.prov,
              country: this.shipping.country,
            },
            idcart: this.idcart,
            shippingType: shippingType,
          },
          {
            headers: { Authorization: `Bearer ${token}`, "e-token": etoken },
          }
        )
        .then((resp) => {
          this.total = this.total - this.totalshipping + resp.data;
          this.totalshipping = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async applyDiscountCode() {
      if (!this.applyDiscount) {
        let token = localStorage.getItem("token");
        await axios
          .post(
            "checkcoupon",
            {
              code: this.discountCode,
              totalcart: JSON.stringify(this.subtotal),
            },
            {
              headers: { Authorization: `Bearer ${token}`, "e-token": etoken },
            }
          )
          .then((resp) => {
            this.discount = this.subtotal - resp.data.newtotal * 100;
            this.subtotal =
              resp.data.newtotal > 0 ? resp.data.newtotal * 100 : 0;
            this.total = this.subtotal + this.gifts + this.totalshipping;
            this.applyDiscount = true;
          })
          .catch((error) => {
            Swal.fire({
              title: error.response.data.error
                ? error.response.data.error
                : "Codice sconto non valido",
              icon: "error",
              confirmButtonText: "Ok",
              confirmButtonColor: "#e20036",
            });
            console.log(error);
          });
      }
    },
    async placeOrder() {
      this.$store.dispatch("setSpinnerLoading", true);
      let shippingType;
      if (this.onehourshipping) {
        shippingType = "onehourshipping";
      } else if (this.localpickup) {
        shippingType = "localpickup";
      }
      let token = localStorage.getItem("token");
      await axios.post("checkout", {
            email: this.email,
            paymentType: this.paymentType,
            shipping: this.shipping,
            billing: this.billing,
            idcart: this.idcart,
            notes: this.notes,
            discountCode: this.discountCode,
            type: "website",
            shippingType: shippingType || "standard",
          },{
            headers: { Authorization: `Bearer ${token}`, "e-token": etoken },
          }
        ).then((resp) => {
          this.$store.dispatch("setSpinnerLoading", false);
          router.push("checkout/" + resp.data.idorder);
        }).catch((error) => {
          this.$store.dispatch("setSpinnerLoading", false);
          if (error.response.status === 400) {
            Swal.fire({
              title: error.response.data.error
                ? error.response.data.error
                : "Technical problems on input data. Check your checkout fields.",
              icon: "error",
              confirmButtonText: "Ok",
              confirmButtonColor: "#e20036",
            });
            console.log(error);
          } else if (error.response.status === 401) {
            Swal.fire({
              title:
                "Devi essere loggato per poter effettuare l'ordine. Se sei già registrato effettua il login, altrimenti vai alla pagina di registrazione.",
              icon: "error",
              showCancelButton: true,
              confirmButtonText: "Login",
              confirmButtonColor: "#e20036",
              cancelButtonText: "Registrazione",
              cancelButtonColor: "#d33",
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirige alla pagina di login
                window.location.href = "/login";
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Redirige alla pagina di registrazione
                window.location.href = "/signup"; // Assicurati che la rotta per la registrazione sia corretta
              }
            });
          } else {
            Swal.fire({
              title: error.response.data.error
                ? error.response.data.error
                : "Technical problems on input data. Check your checkout fields.",
              icon: "error",
              confirmButtonText: "Ok",
              confirmButtonColor: "#e20036",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.summary-prices li {
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.summary-total{
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.btn-apply {
  color: #fff;
  background-color: #f0c57a;
  border-radius: 0;
  border-color: #f0c57a;
}

.btn-apply:hover {
  color: #000;
  background-color: #fff;
  border-color: #f0c57a;
}

.btn-brand {
  color: #fff;
  background-color: #f0c57a;
  border-radius: 10px;
  border-color: #f0c57a;
  padding: 20px 40px 20px 40px !important;
}

.btn-brand:hover {
  color: #000;
  background-color: #fff;
  border-radius: 10px;
  border-color: #f0c57a;
  padding: 20px 40px 20px 40px !important;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  height: 45px;
  border: none;
}

.form-group textarea {
  height: 150px;
}

.form-group input,
.form-group textarea,
.form-group select {
  border-radius: 10px;
  border: none;
  background-color: #f7f7f7;
}
</style>
