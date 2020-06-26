import { getBaseUrl, createRequest } from '../utils/utils';

export const userService = {
    signin: async function (email, password) {
        const url = `${getBaseUrl()}/user/signin`;

        const response = await fetch(url, createRequest('POST', { email, password }));

        return response.json();
    },

    signout: async function () {
        const url = `${getBaseUrl()}/user/signout`;

        const response = await fetch(url);

        return response.json();
    },

    signup: async function (email, password) {
        const url = `${getBaseUrl()}/user/signup`;

        const response = await fetch(url, createRequest('POST', { email, password }));

        return response.json();
    },

    update: async function (id, oldPassword, newPassword) {
        const url = `${getBaseUrl()}/user/update/${id}`;

        const response = await fetch(url, createRequest('PATCH', { oldPassword, newPassword }));

        return response.json();
    }
}