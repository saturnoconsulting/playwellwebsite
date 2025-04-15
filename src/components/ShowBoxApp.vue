<template>
  <div class="section p-0">
    <div class="background-overlay">
      <div class="display-5 text-center">
        <h1>Scarica Vino&Cioccolato App!</h1>
        <h4>Una selezione di eccellenze direttamente a casa tua!</h4>
        <h6>
          Naviga tra gli scaffali del nostro store. Scopri il vino perfetto per la tua serata,<br>
          stimola la golosità con una selezione unica di cacao pregiati e lasciati ispirare dalle fragranze e miscele di
          tè.
        </h6>
        <a target="_blank" href="https://apps.apple.com/app/vino-cioccolato/id1551810807" class="btn btn-brand mt-20 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 384 512">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
          Apple store
        </a>
        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.vec.vec" class="btn btn-brand mt-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 576 512">
            <path d="M420.6 301.9a24 24 0 1 1 24-24 24 24 0 0 1 -24 24m-265.1 0a24 24 0 1 1 24-24 24 24 0 0 1 -24 24m273.7-144.5 47.9-83a10 10 0 1 0 -17.3-10h0l-48.5 84.1a301.3 301.3 0 0 0 -246.6 0L116.2 64.5a10 10 0 1 0 -17.3 10h0l47.9 83C64.5 202.2 8.2 285.6 0 384H576c-8.2-98.5-64.5-181.8-146.9-226.6"/>
          </svg>
          Play store
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBoxApp",
}
</script>

<style scoped>
/* Overlay che copre tutta la sezione */
.background-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Contenitore con sfondo e overlay */
.background-overlay {
  position: relative;
  padding: 100px 20px;
  background-image: url("/images/tappi_app-1067x800-1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  color: white;
  z-index: 0;
}

/* Il testo deve stare sopra l'overlay */
.background-overlay .display-5 {
  position: relative;
  z-index: 2;
}

/* Stili per i pulsanti */
.btn-brand {
  color: #fff !important;
  fill: #fff;
  background-color: #f0c57a;
  border-radius: 10px;
  border-color: #f0c57a;
  margin-top: 20px;
  padding: 20px 40px
}

.btn-brand:hover {
  color: #000;
  fill: #000;
  background-color: white !important;
  border-radius: 10px;
  padding: 20px 40px !important;
}
</style>
