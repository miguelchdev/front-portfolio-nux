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
import { mapState } from 'vuex'

export default {
    async asyncData({ store }) {
        await store.dispatch('bio/fetchBio')
        await store.dispatch('pages/fetchPages')
    },
    computed: {
        ...mapState('pages', [
            'services',
            'contact',
            'introduction',
            'projects',
        ]),
        ...mapState('bio', ['about']),
        short_description() {
            return this.about.slice(0, 120)
        },
    },
    methods: {
        go() {
            this.$vuetify.goTo('#project', {
                duration: 750,
                offset: 0,
                easing: 'easeInQuad',
            })
        },
    },
}
</script>
