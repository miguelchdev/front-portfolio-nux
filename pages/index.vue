<template>
 <div>
    <introduction
            @click="go"
            v-bind="introduction"
        ></introduction>

        <service v-bind="services"></service>

        <project
            id="project"
            v-bind="projects"
        ></project>

        <contact v-bind="contact"></contact>
 </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState("pages", [
            "services",
            "contact",
            "introduction",
            "projects"
        ]),
        ...mapState("bio", [
          'about',
        ]),
        short_description(){
            return this.about.slice(0,120);
        }
    },
    methods: {
        ...mapActions("pages", ["fetchPages"]),
        go() {
            this.$vuetify.goTo('#project', {
                duration: 750,
                offset: 0,
                easing: "easeInQuad"
            });
        }
    },
    created() {
        this.fetchPages();
        console.log(process.env.NUXT_ENV_API_URL)
    }

}
</script>
