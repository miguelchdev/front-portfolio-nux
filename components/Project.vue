<template>
    <div class="bg-light full-view">
        <v-container class="px-sm-12 px-5 padding-y parent-height d-flex flex-column">
            <v-row
                no-gutters
                class="flex-grow-0"
            >
                <v-col
                    xl="8"
                    lg="6"
                    md="6"
                    cols="12"
                    class="mb-md-0 mb-5"
                >
                    <v-lazy
                        v-if="readyAll"
                        :options="{threshold: 1}"
                        min-height="50px"
                        transition="scroll-x-transition"
                    >
                        <h1 class="text-sm-justify text-center description-services mins">{{ title }}</h1>
                    </v-lazy>
                </v-col>
                <v-col
                    xl="4"
                    lg="6"
                    md="6"
                    cols="12"
                >
                    <v-lazy
                        v-if="readyAll"
                        :options="{
                threshold: 1
            }"
                        min-height="50px"
                        transition="scroll-x-transition"
                    >
                        <v-tabs
                            v-model="tab"
                            fixed-tabs
                            background-color="light"
                            show-arrows
                        >
                            <v-tab>{{ $t("projects.all") }}</v-tab>
                            <v-tab
                                v-for="(category, index) in categories"
                                :key="index"
                            >{{ category }}</v-tab>
                        </v-tabs>
                    </v-lazy>
                </v-col>
            </v-row>
            <v-lazy
                v-if="readyAll"
                :options="{
                threshold: 1
            }"
                min-height="300px"
                transition="scroll-x-transition"
                class="mt-auto"
            >
                <project-list
                    :btn-go-text="btnGo"
                    :projects="projects"
                />
            </v-lazy>
            <v-lazy
                v-if="readyAll"
                :options="{threshold: 1}"
                class="mt-auto"
                min-height="50px"
                transition="scroll-x-transition"
            >
                <v-pagination
                    :length="pages"
                    v-model="page"
                ></v-pagination>
            </v-lazy>
        </v-container>
    </div>
</template>

<script>
import ProjectList from "@/components/ProjectList.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    name: "Projects",
    components: { ProjectList },
    props: { title: String, images: Object, page_contents: Object },
    data() {
        return {
            page: 1,
            tab: 0
        };
    },
    methods: {
        ...mapActions("projects", {
            getProjects: "fetchProjects",
            filterBy: "filterBy",
            changePage: "changePage"
        })
    },
    watch: {
        tab(value) {
            let category = value == 0 ? "" : this.categories[value - 1];

            this.filterBy(category);
            this.page = 1;
        },
        page(value) {
            this.changePage(value);
        }
    },
    computed: {
        ...mapGetters("pages", { readyContent: "ready" }),
        ...mapGetters("projects", {
            projects: "paginate",
            pages: "pages",
            ready: "ready",
            categories: "technologys"
        }),
        readyAll() {
            return this.ready || this.readyContent;
        },
        btnGo() {
            return this.$t("projects.btnGo");
        }
    }
};
</script>

<style lang="scss"></style>
<style scoped lang="scss">
.description-services {
    padding-bottom: 3%;
}
</style>
