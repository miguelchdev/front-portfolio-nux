<template>
    <!--  -->
    <v-container fluid
    class="wrapper">

        <fade-transition
            group
            tag="div"
            class="row align-stretch"
        >
            <v-col
                v-for="{id,title,cover,description,link} in projects"
                :key="id"
                xl="4"
                lg="4"
                md="4"
                sm="6"
                cols="12"
            >
                <project-item
                    :id="id"
                    :title="title"
                    :image-url="cover"
                    :description="description"
                    :project-url="link"
                    :btn-go="btnGoText"
                    @click="goTo(id)"
                />
            </v-col>
        </fade-transition>
    </v-container>
    <!--  -->
</template>

<script>
import ProjectItem from "@/components/ProjectListItem.vue";
import { debounce } from "@/helpers";

export default {
    name: "ProjectList",
    components: { ProjectItem },
    props: {
        projects: {
            type: Array,
            required: true
        },
        btnGoText: {
            type: String,
            required: true
        }
    },
    methods: {
        goTo(projectId) {
            this.$router.push({
                path: `project/${projectId}`
               
            });
        }
    },
   
};
</script>

<style lang="scss" scoped>

.wrapper{
    position:relative;
}
</style>
