import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - front-portfolio-nuxt',
    title: 'front-portfolio-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/base.scss'],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en.json',
          },
          {
            code: 'es',
            file: 'es.json',
          },
        ],
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'es',
      },
    ],
  ],
  i18n: {},
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          light: '#fafafa',
          lightText: '#717171',
          lightHeading: '#323232',
          dark: '#1a1a1a',
          darkHeading: '#ffffff',
          darkText: '#d7d7d7',
          gray: '#262626',
          primary: '#1a1a1a',
        },
      },
    },
  },
  loading: false,
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  generate: {
    async routes() {
        const {
          data: { count },
        } = await axios.get(
          `${process.env.NUXT_ENV_API_URL}api/projects/`
        )
        const projects = Array.from({ length: count }, (_, i) => i + 1)
       
        const route = (id) => `${lang}/project/${id}`

        let lang = "/";
        const spanish = projects.map(route)
        lang = "/en"
        const english = projects.map(route)
        console.log({english,spanish})
        return [...english, ...spanish];
    
    },
  },
}
