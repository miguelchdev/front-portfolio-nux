<template>
  <div>
    <introduction
      @click="go"
      v-bind="introduction"
    />

    <service v-bind="services" />

    <project
      id="project"
      v-bind="projects"
    />

    <contact v-bind="contact" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  async asyncData({ store }) {
    await store.dispatch('bio/fetchBio')
    await store.dispatch('pages/fetchPages')
  },
  computed: {
    ...mapState('pages', ['services', 'contact', 'introduction', 'projects']),
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
  async created() {
    await store.dispatch('projects/fetchProjects')
  },
}
</script>
