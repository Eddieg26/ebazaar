import { getBaseUrl } from '../utils/utils';

export const deliveryOptionService = {
    getAll: async function () {
        const url = `${getBaseUrl()}/delivery`;

        const response = await fetch(url);

        return response.json();
    }
}