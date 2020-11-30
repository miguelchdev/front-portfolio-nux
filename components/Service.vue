<template>
    <div class="bg-dark full-view">
        <v-container class="px-sm-12 px-5 padding-y parent-height d-flex flex-column">
            <v-lazy
                v-if="ready"
                :options="{threshold: 1}"
                min-height="50px"
                transition="scroll-x-transition"
            >
                <h1 class="text-sm-justify text-center">{{ title }}</h1>
            </v-lazy>

            <v-lazy
                v-if="ready"
                :options="{
                threshold: 1
            }"
                min-height="150px"
                transition="scroll-x-transition"
            >
                <p class="description-services ">{{ page_contents.description }}</p>
            </v-lazy>
            <v-lazy
                v-if="ready"
                :options="{
                threshold: 0.25}"
                min-height="300px"
                transition="scroll-x-transition"
            >
                <service-list :services="services"></service-list>
            </v-lazy>
        </v-container>
    </div>
</template>

<script>
import ServiceList from "@/components/ServiceList.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: "Service",
    components: { ServiceList },
    props: {
        title: String,
        images: Object,
        page_contents: Object,
    },
    computed: {
        ...mapState("services", {
            services: "items"
        }),
        ...mapGetters("services", { readyServices: "ready" }),
        ...mapGetters("pages", { readyPages: "ready" }),
        ready() {
            return this.readyPages ;
        }
    },
    methods: {
        ...mapActions("services", {
            getServices: "fetchServices"
        })
    },
    mounted() {
        this.getServices();
    }
};
</script>

<style lang="scss">
/* global styles */
//@import "@/assets/styles/base.scss";
</style>

<style lang="scss" scoped>
@import "@/assets/styles/responsive-breakpoints.scss";

.description-services {
    font-weight: 400;
    font-size: 1rem;
    color: var(--v-darkText-base);
    padding: 5% 0 3% 0%;
    word-wrap: break-word;
}
@include respond-above(sm) {
    @media (orientation: portrait) {
        .full-view {
            min-height: 70vh;
            height: auto;
        }
        .parent-height {
            min-height: inherit;
        }
    }
    @media (orientation: landscape) {
        .full-view {
            min-height: 100vh;
            height: auto;
        }
    }
}
</style>
