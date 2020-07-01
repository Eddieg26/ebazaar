import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const brandService = {
    getAll: async function () {
        const url = `${getBaseUrl()}/brands`;

        const response = await axios.get(url);

        console.log(response);

        return response.data;
    }
}