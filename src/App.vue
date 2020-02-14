<template>
    <div class="app">
        <div class="loader" v-if="$store.state.load">
            <div class="heart"></div>
        </div>
        <div class="content">
            <Home v-if="$store.state.path == '/'"></Home>
            <Game v-if="$store.state.path == 'game'"></Game>
            <Instructions v-if="$store.state.path == 'instructions'"></Instructions>
        </div>
    </div>
</template>

<script>
import Home from "./views/Home";
import Game from "./views/Game";
import Instructions from "./views/Instructions";

export default {
    components: {
        Home,
        Game,
        Instructions
    }
};
</script>
