export const state = () => ({
  buffer: [],
})

export const actions = {
  addAction({ commit }, action) {
    commit('addBuffer', action)
  },
  removeAction({ commit }, action) {
    commit('removeBuffer', action)
  },
}

export const getters = {
  loading({ buffer }) {
    return buffer.length != 0
  },
  isLoading({ buffer }) {
    return (element) => buffer.includes(element)
  },
}

export const mutations = {
  addBuffer(state, action) {
    state.buffer.push(action)
  },
  removeBuffer(state, action) {
    state.buffer = state.buffer.filter((item) => item !== action)
  },
}
