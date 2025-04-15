<template>
  <footer class="footer first-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4">
          <hr class="line mb-3">
           <router-link to="/">
              <img class="logo-main" :src="'/images/playwell-logo.png'" style="max-height: 77px;">
           </router-link>
          <h4 class="mt-5 mb-3">
            Specialisti in calzatura e abbigliamento tecnico, è tempo di sport!
          </h4>
          <div class="social-icons d-flex">
            <a target="_blank" href="https://www.facebook.com/PlaywellETempoDiSport/" class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="20" viewBox="0 0 512 512">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
              </svg>
            </a>
            <a target="_blank" href="https://www.instagram.com/playwell_aq/" class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="20" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="col-lg-8">
           <p class="mt-3">
             Siamo <b>Jacopo e Matteo</b>, due amici uniti dalla passione per lo sport.<br>
             Con il marchio <b>Play Well</b> portiamo energia, qualità e competenza con una spiccata passione per lo sport a L'Aquila.
           </p>
           <p class="mt-3">
             Offriamo articoli sportivi per ogni esigenza, dal principiante al pro, dal calcio al fitness e selezioniamo solo il meglio per i nostri clienti.
             Ci rivolgiamo ad atleti, amatori e a chi desidera uno stile di vita attivo. Ogni prodotto è scelto per garantire performance, comfort e durata.
           </p>
           <p class="mt-3">
             Crediamo nel rapporto diretto con i clienti e nell’ascolto delle esigenze, lavoriamo con professionalità, trasparenza e attenzione al dettaglio.
             Il nostro obiettivo è costruire fiducia e offrire soluzioni su misura.
           </p>
           <p class="mt-3">
             Vieni a trovarci in Strada Statale 17, 32 – Scoppito (AQ) oppure chiamaci allo 0862 451619, anche solo per info o curiosità.
             Segui Play Well anche sui social per novità e aggiornamenti.
           </p>
        </div>
      </div>
    </div>
  </footer>
  <footer class="footer second-footer">
    <div class="container">
      <div class="row">
      <div class="col-lg-12">
        <p class="copyright-text">
          &copy; 2025 - Playwell Snc di Esposito J. & Marchetti M.
          <br>
          P.IVA 01864150667<br>
          Via Verdi 31, 67100<br>
          L'Aquila (AQ)
        </p>
        <div class="credits">powered by <a target="_blank" href="https://saturnoconsulting.com/">Saturno Ret[AI]l</a></div>
      </div>
    </div>
    </div>
  </footer>
</template>

<script>
import {PATH_APP} from '@/constants/constants';

export default {
  name: "Footer",
  props: ['menus'],
  data() {
    return {
      base: PATH_APP
    }
  },
  methods:{
    isExternalLink(link) {
      return /^(http|https):\/\//.test(link);
    }
  }
}
</script>

<style scoped>
.line {
  color: white;
  width: 40px;
}

.second-footer .copyright-text {
  font-size: 15px;
  color: #fff;
  text-align: center;
}

.second-footer {
  background-color: #000;
}

.second-footer .credits{
  text-align: center;
  font-size: 12px;
  color: #dedede;
}

.first-footer p {
  color: #757575 !important;
  font-size: 16px;
}

.first-footer {
  background-color: #dedede;
}

.logo-main {
  position: page;
}

a {
  color: #dedede !important;
}
.iubenda{
  font-size: 11px !important;
  color: white !important;
  padding: 2px;
}
</style>