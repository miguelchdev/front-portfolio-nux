<template>
    <introduction-background
        light="true"
        :image="images.banner"
        @load-banner="removeAction('banner')"
    >
        <v-container class="px-sm-12 px-6 d-flex align-stretch fill-height">
            <v-row class=" mx-auto">
                <v-col
                    xl="8"
                    lg="8"
                    md="7"
                    sm="8"
                    xs="12"
                    col="12"
                    class="d-flex flex-column"
                >
                    <v-scroll-x-transition appear>
                        <p
                            v-show="ready"
                            class="mx-sm-0 mx-auto"
                        >{{ welcome_message }}</p>
                    </v-scroll-x-transition>

                    <v-scroll-x-transition appear>
                        <div v-show="ready" class="mt-auto">
                            <h1 class="text-sm-left text-center name mb-5">
                                {{ full_name }}
                            </h1>

                            <p class="text-sm-left text-center mb-5 about">
                                {{ about }}
                            </p>

                            <div class="text-sm-left text-center bt-container">
                                <v-btn
                                    tile
                                    large
                                    elevation="24"
                                    @click="click"
                                >
                                    {{ $t("introduction.myWork") }}
                                </v-btn>
                                 <v-btn
                                    v-if="cvLink"
                                    tile
                                    elevation="24"
                                    large
                                    @click="open"
                                >
                                    {{ $t("introduction.cv") }}
                                </v-btn>
                            </div>
                        </div>
                    </v-scroll-x-transition>
                    <v-scroll-x-transition appear>
                        <div v-show="ready" class="mt-auto mx-sm-0 mx-auto pt-5">
                            <a
                                v-for="(item, index) in social_networks"
                                :key="index"
                                :href="item"
                                class="social pr-sm-5 pr-2"
                                target="_blank"
                            >
                                {{ index }}
                            </a>
                        </div>
                    </v-scroll-x-transition>
                </v-col>
            </v-row>
        </v-container>
    </introduction-background>
</template>

<script>
import IntroductionBackground from "@/components/IntroductionBackground.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    name: "Introduction",
    components: { IntroductionBackground },
    props: { title: String, images: Object, page_contents: Object },
    computed: {
        ...mapState("bio", ["welcome_message", "about", "social_networks","cvLink"]),
        ...mapGetters("bio", ["full_name","ready"]),
    },
    created() {
        this.addAction('banner');
    },
    methods: {
        ...mapActions("bio", { getBio: "fetchBio" }),
        ...mapActions(['addAction','removeAction']),
        click(){
            this.$emit('click');
        },open(){
            window.open(this.cvLink,'_blank');
        }
    }
};
</script>


<style scoped lang="scss">
.bt-container{
    display: flex;
    *+*{
        margin-left: 0.5em;
    }
}

.about {
    word-wrap: break-word;
}
.fill-height {
    min-height: 100%;
}
.name {
    font-size: 4.2rem;
    text-transform:uppercase;
    font-family: 'Proxima Nova';
}

.social {
    text-transform: capitalize;
    font-weight: 900;
    text-decoration: none;
}
</style>