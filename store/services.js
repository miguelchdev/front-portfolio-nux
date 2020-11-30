import portfolioApi from '@/services/portfolioApi'

export const state = () => ({
  items: [],
})

export const actions = {
  async fetchServices({ commit, dispatch }) {
    dispatch('addAction', 'fetchServices', { root: true })

    const { results, error } = await portfolioApi.getServices()
    if (!error) {
      commit('setServices', results)
    } else {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching Services Info: ' + error.message,
      }
      dispatch('notifications/add', notification, { root: true })
    }
    dispatch('removeAction', 'fetchServices', { root: true })
  },
}

export const getters = {
  total: (state) => state.items.length,
  ready({ items }, _getters, _rootState, { isLoading }) {
    return items.length > 0 && !isLoading('fetchServices')
  },
}

export const mutations = {
  setServices(state, services) {
    state.items = services
  },
}
