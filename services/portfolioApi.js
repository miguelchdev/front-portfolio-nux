import axios from "axios";

axios.defaults.baseURL = process.env.NUXT_ENV_API_URL || "";

const get = async (url, params) => {
    try {
        const { data } = await axios.get(url, {
            params: params,
        });
        return data;
    } catch (error) {
        return { error };
    }
};

const post = async (url, content, params = {}) => {
    let token = process.env.VUE_APP_EMAIL_TOKEN;
    try {
        const { data } = await axios.post(url, content, {
            params: params,
            headers: { Authorization: `Token ${token}` },
        });
        return data;
    } catch (error) {
        return null;
    }
};

export default {
    getBios(params = {}) {
        return get("api/bio/", params);
    },
    getBio(pk, params = {}) {
        return get(`api/bio/${pk}`, params);
    },
    getProjects(params = {}) {
        return get("api/projects/", params);
    },
    getProject(pk, params = {}) {
        return get(`api/projects/${pk}`, params);
    },
    getServices(params = {}) {
        return get(`api/service/`, params);
    },
    sendEmail(content) {
        return post("en/api/email_service/", content);
    },
    getPages(params = {}) {
        return get(`api/page/`, params);
    },
};
