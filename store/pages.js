import portfolioApi from '@/services/portfolioApi'

export const state = () => ({
    services: null,
    introduction: { images: {} },
    contact: null,
    projects: null,
})

export const actions = {
    async fetchPages({ commit, dispatch }) {
        dispatch("addAction", "fetchContent", { root: true });

        const { results, error } = await portfolioApi.getPages();
        if (!error) {
            const { services, contact, introduction, projects } = results;
            commit("setServices", services);
            commit("setContact", contact);
            commit("setIntroduction", introduction);
            commit("setProjects", projects);
        } else {
            const notification = {
                type: "error",
                message:
                    "There was a problem fetching content: " +
                    error.message,
            };

            dispatch("notifications/add", notification, { root: true });
        }

        dispatch("removeAction", "fetchContent", { root: true });
    },
}

export const getters = {
    ready({ services }, _getters, _rootState, { isLoading }) {
        return services && !isLoading("fetchContent");
    },
}

export const mutations = {
    setServices(state, services) {
        state.services = services;
    },
    setContact(state, contact) {
        state.contact = contact;
    },
    setIntroduction(state, introduction) {
        state.introduction = introduction;
    },
    setProjects(state, projects) {
        state.projects = projects;
    },
}
