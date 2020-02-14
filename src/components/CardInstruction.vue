<template>
    <div>
        <!-- CARTAS -->
        <div v-images-loaded:on.progress="imageProgress">
            <VueSwing :config="swingConfig" ref="cardSwing" class="card-swing">
                <img
                    v-for="(card, index) in $store.state.instructions"
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
            minThrowOutDistance: 350,
            maxThrowOutDistance: 400,
            throwOutConfidence: () => {
                return 0;
            }
        }
    }),

    components: {
        VueSwing
    },

    directives: {
        imagesLoaded
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
                cards[i].on("throwoutend", card => {
                    let target = document.getElementById(card.target.id);
                    target.setAttribute("style", "display: none;");
                });
            }
        },

        next(n) {
            let cards = this.$refs.cardSwing.cards;
            cards[n].throwOut(n % 2 == 0 ? 250 : -250, 12);
        }
    }
};
</script>