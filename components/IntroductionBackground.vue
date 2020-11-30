<template>
    <v-container
        fluid
        class="px-0 py-0 full-view bg-light wrapper"
    >
        <v-row
            no-gutters
            justify="end"
            class="layer-0"
        >
            <transition name="fade">

                <v-col
                    v-if="show"
                    xl="4"
                    lg="4"
                    md="4"
                    sm="4"
                    class="hide-only-xs"
                    :style="styleObject"
                >
                </v-col>
            </transition>
        </v-row>
        <div class="layer-1">
            <slot></slot>
        </div>
    </v-container>
</template>

<script>
import { cloudinarySrcSet } from "@/helpers";

export default {
    name: "IntroductionBackground",
    props: {
        image: {
            type: Object,
            required: true,
            default() {
                return {
                    file: null,
                    alt: ""
                };
            }
        }
    },
    data() {
        return {
            imageInner: "",
            imageUrl: "",
            show: false
        };
    },
    computed: {
        background() {
            return this.imageInner
                ? "url(" + this.imageInner + ")  15% 0%"
                : "transparent";
        },
        styleObject() {
            return {
                height: "auto",
                width: "100%",
                backgroundRepeat: "no-repeat",
                background: this.background,
                backgroundSize: "cover"
            };
        },
        srcSet() {
            return cloudinarySrcSet(this.image.file);
        },
        sizes() {
            return this.$vuetify.breakpoint.smAndUp ? "50vw" : "0vw";
        }
    },
    watch: {
        image() {
            this.image.file && this.setImage();
        },
        sizes() {
            this.setImage();
        }
    },
    methods: {
        setImage() {
            if (this.sizes == "0vw") {
                this.$emit("load-banner");
            } else {
                let highResImage = new Image();
                highResImage.onload = () => {
                    this.imageInner = highResImage.currentSrc;
                    this.show = true;
                    this.$emit("load-banner");
                };
                highResImage.sizes = this.sizes;
                highResImage.srcset = this.srcSet;
            }
        }
    },
    mounted() {
        this.image.file && this.setImage();
    }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/responsive-breakpoints.scss";

// Telefonos moviles en landscape
@include respond-between(xs, md) {
    @media (orientation: landscape) {
        .layer-0,
        .layer-1 {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .layer-1 {
            z-index: 10;
        }
    }
}
//Tables pequeñas y hacia arriba
@include respond-above(sm) {
    .layer-0,
    .layer-1 {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .layer-1 {
        z-index: 10;
    }
}

.wrapper {
    position: relative;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
