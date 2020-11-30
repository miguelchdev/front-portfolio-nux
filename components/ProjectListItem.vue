<template>
    <v-hover v-slot:default="{ hover }">
        <!-- Se necesita establecer un ancho fijo para evitar los issues al redimensionar -->
        <v-card
            :elevation="hover ? 10 : elevation"
            tile
            @click="go"
        >
            <v-img
                class="white--text"
                :sizes="sizes"
                :src="src"
                :lazy-src="lazySrc"
                :srcset="srcSet"
                :aspect-ratio="16/9"
            >
            </v-img>
            <v-card-title>
                {{ title }}
            </v-card-title>
            <v-card-actions>
                <v-btn
                    v-if="btnGo"
                    text
                    @click="go"
                >{{btnGo}}</v-btn>
            </v-card-actions>
        </v-card>

    </v-hover>
</template>

<script>
import {cloudinaryImage,cloudinarySrcSet} from '@/helpers';
export default {
    name: "ProjectItem",
    props: {
        title: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        description: { type: String, default: "" },
        id: { type: Number, required: true },
        active: {
            type: Boolean,
            default: false
        },
        projectUrl: {
            type: String
        },
        btnGo: {
            type: String
        }
    },
    data: () => ({
        loading: true,
        show: false
    }),
    methods: {
        go() {
            this.$emit("click");
        }
    },
    computed: {
        elevation() {
            return this.$vuetify.breakpoint.smAndDown ? 4 : 2;
        },
        lazySrc(){
            return cloudinaryImage(this.imageUrl,['f_auto','q_50','w_100']);
        },srcSet(){
            return cloudinarySrcSet(this.imageUrl);
        },src(){
            return cloudinaryImage(this.imageUrl,['f_auto','w_1','q_96']);
        },sizes(){
            return this.$vuetify.breakpoint.smAndDown ? '80vw' : '15vw';
        }
    }
};
</script>

<style scoped lang="scss">
</style>
