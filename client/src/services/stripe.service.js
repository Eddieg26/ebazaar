import { getBaseUrl, createRequest } from '../utils/utils';

export const stripeService = {
    createCharge: async function (id, products) {
        const url = `${getBaseUrl()}/stripe/charge`;

        const response = await fetch(url, createRequest('POST', { id, products }));

        return response.json();

    }
}