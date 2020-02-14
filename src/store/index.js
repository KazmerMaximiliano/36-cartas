import Vue from "vue";
import Vuex from "vuex";

// JSON
import JSONcards from "@/assets/json/cards.json";
import JSONinstructions from "@/assets/json/instructions.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    path: "/",
    load: true,
    cards: JSONcards.reverse(),
    instructions: JSONinstructions,
    showChronometer: false
  },

  mutations: {
    setPath(state, string) {
      state.path = string;
    },

    setLoad(state, bool) {
      state.load = bool;
    },

    setChronometer(state, bool) {
      state.showChronometer = bool;
    }
  },

  actions: {
    surf({ commit }, object) {
      commit("setLoad", true);
      if (object.path) {
        if (object.path == "game") {
          commit("setChronometer", false);
        }
        commit("setPath", object.path);
      } else {
        commit("setPath", "/");
      }
    }
  }
});
