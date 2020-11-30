<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            :elevation="elevation(hover)"
            class="py-xl-8 px-xl-6 px-md-1 px-sm-2"
            tile
            height="100%"
            :color="color(hover)"
        >
            <v-responsive :aspect-ratio="6 / 5">
                <v-card-title>
                    <h2 class="title-card">{{ title }}</h2>
                    <div class="line py-2"></div>
                </v-card-title>
                <v-card-text class="aling-self-end">
                    <p class="description-text pt-xl-8 pt-lg-8 pt-md-5 pt-sm-5 pt-5">
                        {{ description }}
                    </p>
                </v-card-text>
            </v-responsive>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: "ServiceListItem",
    props: {
        title: { type: String, default: "" },
        description: { type: String, default: "" }
    },
    data: () => ({
        loading: true,
        show: false
    }),

    methods: {
        color(hover) {
            return hover || this.$vuetify.breakpoint.smAndDown
                ? "gray"
                : "dark";
        },
        elevation(hover) {
            return hover || this.$vuetify.breakpoint.smAndDown ? 24 : 0;
        }
    }
};
</script>

<style lang="scss"></style>

<style scoped lang="scss">
@import "@/assets/styles/responsive-breakpoints.scss";
.title-card {
    text-transform: capitalize;
    font-weight: 100;
    width: 100%;
}
.line {
    width: 12%;
    height: auto;
    border-bottom: 0.22rem solid white;
    position: relative;
}
.description-text {
    font-size: 1.15rem;
    line-height: 2rem;
}
@include respond-below(md) {
    .description-text {
        font-size: 0.95rem;
        line-height: 1.2rem;
        text-justify: auto;
    }
    .line {
        width: 20%;
        height: auto;
        border-bottom: 0.22rem solid white;
        position: relative;
    }
}
</style>
