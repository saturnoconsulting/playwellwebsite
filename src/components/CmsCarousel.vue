<template>
  <div class="container pt-5">
    <div class="row">
      <div :class="[data.columnb, data.classes]" v-for="(item, index) in data" :key="index">
        <div class="card mt-2">
          <div class="card-body p-0 position-relative">
            <img :src="item.url" :alt="item.alt" class="card-img">
            <div class="overlay"></div>
            <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
              <div class="top-left-text">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {};
  },
};
</script>

<style scoped>
.card {
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  transition: transform 0.3s;
  border: none;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures cards take up equal height */
}

.card:hover {
  z-index: 2;
  transform: scale(1.05);
}

.card-img {
  width: 100%;
  height: 200px; /* Set a fixed height for the image */
  object-fit: cover; /* Ensures the image fills the space without stretching */
  transition: transform 0.3s ease;
}

.card:hover .card-img {
  transform: scale(1.1); /* Image zoom effect on hover */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;
}

.card-img-overlay {
  color: white;
  z-index: 1;
  text-align: center;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.top-left-text {
  padding: 10px;
  font-size: 16px; /* Adjust font size for consistency */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Make text more readable on top of images */
}
</style>
