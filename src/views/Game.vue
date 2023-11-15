<template>
  <div class="container">
    <div class="card-stack" style="height: 85%">
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
      <!-- CRONOMETRO -->
      <div v-show="$store.state.showChronometer" class="chronometer-container">
        <p>Finalmente,</p>
        <br />
        <p>
          mira por 4 minutos a la persona con la que respondiste estas
          preguntas.
        </p>
        <br />
        <h1>{{ time }}</h1>
        <button
          @click="startCount()"
          v-if="timer == null && time != '00:00'"
          class="btn btn-pink"
        >
          Inciar
        </button>
      </div>
      <!-- CARTAS -->
      <CardGame v-if="!$store.state.showChronometer"></CardGame>
    </div>
    <div class="btn-container" style="height: 20%">
      <button @click="nextCard()" class="btn btn-pink" style="width: inherit">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import CardGame from "../components/CardGame";
import moment from "moment";

export default {
  data: () => ({
    timeLeft: moment(60 * 4 * 1000),
    timer: null,
  }),

  components: {
    CardGame,
  },

  computed: {
    time() {
      return this.timeLeft.format("mm:ss");
    },
  },

  methods: {
    setRotation(i) {
      if (i % 2 == 0) {
        return "transform: rotate(" + Number(2 * i) + "deg);";
      } else {
        return "transform: rotate(" + Number(-2 * i) + "deg);";
      }
    },

    startCount() {
      this.timer = setInterval(() => {
        this.timeLeft = moment(this.timeLeft.subtract(1, "seconds"));
        if (this.timer && this.time == "00:00") {
          clearInterval(this.timer);
          this.timer = null;
          this.playNotification();
        }
      }, 1000);
    },

    playNotification() {
      let audio = new Audio(require("@/assets/music/notification.ogg"));
      audio.play();
    },

    nextCard() {},
  },
};
</script>
