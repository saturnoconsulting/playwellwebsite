<template>

  <!--  --->
  <div class="accordion" :class="[data.columnb, data.classes]"  id="accordion">
    <div class="accordion-item" v-if="data.title_acc_1 && data.content_acc_1">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          {{ data.title_acc_1 }}
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordion">
        <div class="accordion-body">
          <div v-html="data.content_acc_1" />
        </div>
      </div>
    </div>

    <div class="accordion-item" v-if="data.title_acc_2 && data.content_acc_2">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          {{ data.title_acc_2 }}
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
        <div class="accordion-body">
          <div v-html="data.content_acc_2" />
        </div>
      </div>
    </div>

    <div class="accordion-item"  v-if="data.title_acc_3 && data.content_acc_3">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          {{ data.title_acc_3 }}
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
        <div class="accordion-body">
          <div v-html="data.content_acc_3" />
        </div>
      </div>
    </div>

    <div class="accordion-item"  v-if="data.title_acc_4 && data.content_acc_4">
      <h2 class="accordion-header" id="headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          {{ data.title_acc_4 }}
        </button>
      </h2>
      <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
        <div class="accordion-body">
          <div v-html="data.content_acc_4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CmsAccordion",
  props: ['data']
}
</script>

<style scoped>
</style>

