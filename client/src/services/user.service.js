import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const userService = {
    signin: async function (email, password) {
        const url = `${getBaseUrl()}/user/signin`;

        const response = await axios.post(url, { email, password });

        return response.data;
    },

    signout: async function () {
        const url = `${getBaseUrl()}/user/signout`;

        const response = await axios.get(url);

        return response.data;
    },

    signup: async function (email, password) {
        const url = `${getBaseUrl()}/user/signup`;

        const response = await axios.post(url, { email, password });

        return response.data;
    },

    update: async function (id, oldPassword, newPassword) {
        const url = `${getBaseUrl()}/user/update/${id}`;

        const response = await axios.patch(url, { oldPassword, newPassword });

        return response.data;
    }
}