<template>
  <div class="container">
    <div class="card-stack" v-images-loaded:on.progress="mainProgress">
      <img
        src="@/assets/img/base.png"
        class="card-img"
        v-for="i in 3"
        :key="i"
        :style="setRotation(i)"
      />
      <img src="@/assets/img/cards/carta_37.png" class="card-img" id="logo" />
    </div>
    <div class="btn-container">
      <button
        @click="$store.dispatch('surf', { path: 'game' })"
        class="btn btn-pink"
        style="width: inherit"
      >
        Jugar
      </button>
    </div>
    <div class="btn-container">
      <button
        @click="$store.dispatch('surf', { path: 'instructions' })"
        class="btn btn-blue stack-btn"
        style="width: inherit"
      >
        Como Jugar
      </button>
    </div>
  </div>
</template>

<script>
import imagesLoaded from "vue-images-loaded";

export default {
  directives: {
    imagesLoaded,
  },

  methods: {
    mainProgress(instance, image) {
      if (image.img.id == "logo") {
        this.$store.commit("setLoad", false);
      }
    },

    setRotation(i) {
      if (i % 2 == 0) {
        return "transform: rotate(" + Number(2 * i) + "deg);";
      } else {
        return "transform: rotate(" + Number(-2 * i) + "deg);";
      }
    },
  },
};
</script>
