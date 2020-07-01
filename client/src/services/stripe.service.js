import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const stripeService = {
    createCharge: async function (id, products) {
        const url = `${getBaseUrl()}/stripe/charge`;

        const response = await axios.post(url, { id, products });

        return response.data;

    }
}