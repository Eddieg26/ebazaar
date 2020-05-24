import { getBaseUrl } from '../utils/utils';

export const categoryService = {
    getAll: async function () {
        const url = `${getBaseUrl()}/category`;

        const response = await fetch(url);

        return response.json();
    }
}