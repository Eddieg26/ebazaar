import { getBaseUrl } from '../utils/utils';

export const brandsService = {
    getAll: async function () {
        const url = `${getBaseUrl()}/brands`;

        const response = await fetch(url);

        return response.json();
    }
}