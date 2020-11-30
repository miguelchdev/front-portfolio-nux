import portfolioApi from '@/services/portfolioApi'

export const state = () => ({
  items: [],
  page: 1,
  count: null,
  startTo: 1,
  query: '',
  perPage: 3,
})

export const actions = {
  async fetchProjects({ commit, state, getters, dispatch }) {
    if (!getters.allItemsDownloaed) {
      dispatch('addAction', 'fetchProjects', { root: true })

      const { results, next, count, error } = await portfolioApi.getProjects({
        page: state.page,
      })

      if (!error) {
        !getters.allItemsDownloaed && commit('setProjects', results)
        commit('setCount', count)
        next && commit('setNextPage')

        let downloadMoreItems =
          getters.areTherePerPageItems && !getters.allItemsDownloaed

        downloadMoreItems && dispatch('fetchProjects')
      } else {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching projects: ' + error.message,
        }
        dispatch('notifications/add', notification, { root: true })
      }

      dispatch('removeAction', 'fetchProjects', { root: true })
    }
  },
  async fetchProject({ commit, getters, dispatch }, id) {
    let project = getters.getProjectById(id)

    if (project) {
      return project
    } else {
      dispatch('addAction', 'fetchProject', { root: true })
      project = await portfolioApi.getProject(id)
      dispatch('removeAction', 'fetchProject', { root: true })

      return project
    }
  },
  filterBy({ commit }, query) {
    commit('setQuery', query)
  },
  async changePage({ commit, state, getters, dispatch }, page) {
    if (page == getters.page - 1) {
      await dispatch('fetchProjects')
    }

    commit('setStart', page)
  },
}

export const getters = {
  total({ items }) {
    return items.length
  },
  getProjectById({ items }) {
    return (id) => items.find((project) => project.id === id)
  },
  technologys({ items }) {
    return items.flatMap((project) => project.technologys).filter(onlyUnique)
  },
  allItemsDownloaed({ count }, { total }) {
    return count == total
  },
  areTherePerPageItems({ perPage }, { total }) {
    return perPage >= total
  },
  ready(_state, { total }, _rootState, { isLoading }) {
    return total > 0 && !isLoading('fetchProjects')
  },
  filterItems({ items, query }) {
    return filterFun(items, 'technologys', query)
  },
  paginate({ perPage, startTo }, { filterItems }) {
    let start = (startTo - 1) * perPage
    let end = startTo * perPage
    return filterItems.slice(start, end)
  },
  pages({ perPage }, { filterItems }) {
    return Math.ceil(filterItems.length / perPage)
  },
}

export const mutations = {
  setProjects(state, projects) {
    state.items.push(...projects)
  },
  setNextPage(state) {
    state.page++
  },
  setCount(state, number) {
    state.count = number
  },
  setQuery(state, query) {
    state.query = query
  },
  setStart(state, page) {
    state.startTo = page
  },
}
