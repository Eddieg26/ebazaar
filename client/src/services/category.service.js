import { getBaseUrl } from '../utils/utils';
import axios from 'axios';

export const categoryService = {
    getAll: async function () {
        const url = `${getBaseUrl()}/category`;

        const response = await axios.get(url);

        return response.data;
    }
}