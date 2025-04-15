<template>
  <div class="container-fluid p-0">
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(item, index) in data" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="item.url" alt="Immagine Slide" class="d-block w-100 img-slide">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center h-100 text-center">
            <p v-if="item.title_slide" class="title-slide">{{ item.title_slide }}</p><br>
            <h4 v-if="item.subtitle_slide">{{ item.subtitle_slide }}</h4><br>
            <a v-if="item.check_button === 1" :href="item.link_button" target="_blank" class="button-slide btn text-center">
              <b>Scopri</b>
            </a>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data'],
};
</script>

<style scoped>
.title-slide{
  color: #f1c67b;
  font-size:60px ;
}
.button-slide {
  color: white;
  background-color: #efc47a;
  border-radius: 10px;
  border-color: #efc47a;
  padding: 10px 30px 10px 30px !important;
}

.button-slide:hover {
  color: black;
  background-color: white;
  border-radius: 10px;
  border-color: #efc47a;
  padding: 10px 30px 10px 30px !important;
}

.img-slide {
  object-fit: cover;
  min-height: 450px;
}
</style>
