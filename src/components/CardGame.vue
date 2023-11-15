<template>
  <div>
    <!-- CARTAS -->
    <div v-images-loaded:on.progress="imageProgress">
      <VueSwing :config="swingConfig" ref="cardSwing" class="card-swing">
        <img
          v-for="(card, index) in $store.state.cards"
          :key="index"
          :src="require(`@/assets/img/cards/${card.img}`)"
          class="card-game"
          :id="card.id"
        />
      </VueSwing>
    </div>
  </div>
</template>

<script>
import VueSwing from "vue-swing";
import imagesLoaded from "vue-images-loaded";

export default {
  data: () => ({
    swingConfig: {
      minThrowOutDistance: 400,
      maxThrowOutDistance: 500,
    },
    nextCard: 0,
    previusCard: -1,
  }),

  components: {
    VueSwing,
  },

  directives: {
    imagesLoaded,
  },

  mounted() {
    this.cardsOn();
  },

  methods: {
    imageProgress(instance, image) {
      if (image.img.id == 0) {
        this.$store.commit("setLoad", false);
      }
    },

    cardsOn() {
      let cards = this.$refs.cardSwing.cards;
      for (let i = 0; i < cards.length; i++) {
        cards[i].on("throwoutend", (card) => {
          // MOSTRAR CRONOMETRO AL TERMINAR LAS CARTAS
          if (card.target.id == 35) {
            this.$store.commit("setChronometer", true);
          }
          // // OCULTAR CARTAS
          // let target = document.getElementById(card.target.id);
          // target.setAttribute("style", "display: none;");

          this.nextCard = Number(card.target.id) + 1;
          this.previusCard = Number(card.target.id);
        });

        cards[i].on("throwinend", (card) => {
          // OCULTAR CRONOMETRO AL TERMINAR LAS CARTAS
          if (card.target.id == 35) {
            this.$store.commit("setChronometer", false);
          }
          // // MOSTRAR CARTAS
          // let target = document.getElementById(card.target.id);
          // target.setAttribute("style", "display: block;");

          console.log(card.target.id);
        });
      }
    },
  },
};
</script>

<style></style>
