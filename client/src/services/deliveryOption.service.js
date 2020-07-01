import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const deliveryOptionService = {
    getAll: async function () {
        const url = `${getBaseUrl()}/delivery`;

        const response = await axios.get(url);

        return response.data;
    }
}