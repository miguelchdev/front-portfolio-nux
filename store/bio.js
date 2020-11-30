import portfolioApi from '@/services/portfolioApi'

export const state = () => ({
  name: '',
  last_name: '',
  welcome_message: null,
  about: '',
  social_networks: [],
  cvLink: null,
})


export const actions = {
  async fetchBio({ commit, dispatch }) {
    dispatch('addAction', 'fetchBio', { root: true })

    const {
      name,
      last_name,
      welcome_message,
      about,
      social_networks,
      cv_link,
      error,
    } = await portfolioApi.getBio(1)

    if (!error) {
      commit('setName', name)
      commit('setLastName', last_name)
      commit('setWelcomeMessage', welcome_message)
      commit('setAbout', about)
      commit('setSocialNetworks', social_networks)
      commit('setCVLink', cv_link)
    } else {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching info: ' + error.message,
      }
      dispatch('notifications/add', notification, { root: true })
    }
    dispatch('removeAction', 'fetchBio', { root: true })
  },
}


export const getters = {
  full_name({ name, last_name }) {
    return name + ' ' + last_name
  },
  ready({ welcome_message }, _getters, _rootState, { isLoading }) {
    return welcome_message && !isLoading('fetchBio')
  },
}

export const mutations = {
    setName(state, name) {
      state.name = name
    },
    setLastName(state, last_name) {
      state.last_name = last_name
    },
    setWelcomeMessage(state, welcome_message) {
      state.welcome_message = welcome_message
    },
    setAbout(state, about) {
      state.about = about
    },
    setSocialNetworks(state, social_networks) {
      state.social_networks = social_networks
    },
    setCVLink(state, link) {
      state.cvLink = link
    },
  }
  