import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const productService = {
    getById: async function (productId) {
        const url = `${getBaseUrl()}/product/${productId}`;

        const response = await axios.get(url);

        return response.data;
    },

    getByIdMany: async function (productIds) {
        const productIdsParam = JSON.stringify(productIds);
        const url = `${getBaseUrl()}/product/many/${productIdsParam}`;

        const response = await axios.get(url);

        return response.data;
    },

    getAll: async function () {
        const url = `${getBaseUrl()}/product`;

        const response = await axios.get(url);

        return response.data;
    },

    getByFilter: async function (filterOptions) {
        const url = `${getBaseUrl()}/product/filter`;

        const response = await axios.post(url, filterOptions);

        return response.data;
    }
}