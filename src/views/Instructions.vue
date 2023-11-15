<template>
  <div class="container">
    <div class="card-stack" style="height: 75%">
      <!-- BARRA DE NAVEGACION SUPERIOR -->
      <div class="game-nav">
        <div class="nav-content">
          <button @click="$store.dispatch('surf', {})" class="nav-btn">
            <i class="fas fa-angle-left" style="font-size: 32px;"></i>
          </button>
        </div>
      </div>
      <!-- FONDO DE CARTAS -->
      <img
        src="../assets/img/base.png"
        class="card-img"
        v-for="i in 3"
        :key="i"
        :style="setRotation(i)"
      />
      <!-- CARTAS -->
      <CardInstruction ref="cardInstruction"></CardInstruction>
    </div>
    <!-- BOTONES -->
    <div class="btn-container" style="height: 20%">
      <button
        v-if="step >= 1"
        @click="nextInstruction()"
        class="btn btn-pink"
        style="width: inherit"
      >
        Siguiente
      </button>
      <button
        v-else
        @click="$store.dispatch('surf', {})"
        class="btn btn-blue"
        style="width: inherit"
      >
        Entendido
      </button>
    </div>
  </div>
</template>

<script>
import CardInstruction from "../components/CardInstruction";

export default {
  data: () => ({
    step: 4,
  }),

  components: {
    CardInstruction,
  },

  methods: {
    setRotation(i) {
      if (i % 2 == 0) {
        return "transform: rotate(" + Number(2 * i) + "deg);";
      } else {
        return "transform: rotate(" + Number(-2 * i) + "deg);";
      }
    },

    nextInstruction() {
      if (this.step >= 1) {
        this.$refs.cardInstruction.next(this.step);
        this.step--;
      }
    },
  },
};
</script>

<style></style>
