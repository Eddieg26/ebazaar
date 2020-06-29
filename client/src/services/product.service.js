import { getBaseUrl, createRequest } from '../utils/utils';

export const productService = {
    getById: async function (productId) {
        const url = `${getBaseUrl()}/product/${productId}`;

        const response = await fetch(url);

        return response.json();
    },

    getByIdMany: async function (productIds) {
        const productIdsParam = JSON.stringify(productIds);
        const url = `${getBaseUrl()}/product/many/${productIdsParam}`;

        const response = await fetch(url);

        return response.json();
    },

    getAll: async function () {
        const url = `${getBaseUrl()}/product`;

        const response = await fetch(url);

        return response.json();
    },

    getByFilter: async function (filterOptions) {
        const url = `${getBaseUrl()}/product/filter`;

        const response = await fetch(url, createRequest('POST', filterOptions));

        return response.json();
    }
}