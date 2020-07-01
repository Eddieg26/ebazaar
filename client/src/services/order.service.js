import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const orderService = {
    getByCustomer: async function (customerId) {
        const url = `${getBaseUrl()}/order/${customerId}`;

        const response = await axios.get(url);

        return response.data;
    },

    create: async function (orderInfo) {
        const url = `${getBaseUrl()}/order/create`;

        const response = await axios.post(url, orderInfo);

        return response.data;
    },

    update: async function (orderId, updatedInfo) {
        const url = `${getBaseUrl()}/order/update/${orderId}`;

        const response = await axios.patch(url, updatedInfo);

        return response.data;
    },

    deleteOrder: async function (orderId) {
        const url = `${getBaseUrl()}/order/delete/${orderId}`;

        const response = await axios.delete(url);

        return response.data;
    }
}