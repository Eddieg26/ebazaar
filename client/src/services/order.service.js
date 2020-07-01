import { getBaseUrl, createRequest } from '../utils/utils';

export const orderService = {
    getByCustomer: async function (customerId) {
        const url = `${getBaseUrl()}/order/${customerId}`;

        const response = await fetch(url);

        return response.json();
    },

    create: async function (orderInfo) {
        const url = `${getBaseUrl()}/order/create`;

        const response = await fetch(url, createRequest('POST', orderInfo));

        return response.json();
    },

    update: async function (orderId, updatedInfo) {
        const url = `${getBaseUrl()}/order/update/${orderId}`;

        const response = await fetch(url, createRequest('PATCH', updatedInfo));

        return response.json();
    },

    deleteOrder: async function (orderId) {
        const url = `${getBaseUrl()}/order/delete/${orderId}`;

        try {
            const response = await fetch(url, createRequest('DELETE', { orderId }));
            return response.json();
        } catch (error) {
            return null;
        }
    }
}