import { brandService } from '../brand.service';

describe('Check if brand service is working as intended',() => {

    test('Check if correct amount of brands are returned', async () => {
        expect.assertions(1);
        const brands = await brandService.getAll();

        expect(brands).toHaveLength(4);
    });

    test('Check if correct brands are returned', async () => {
        expect.assertions(1);

        const testBrands = [
            {
                _id: 0,
                name: 'Apple'
            },
            {
                _id: 1,
                name: 'Samsung'
            },
            {
                _id: 2,
                name: 'Sony'
            },
            {
                _id: 3,
                name: 'Beats'
            },
        ].sort();

        const brands = await brandService.getAll();
        expect(brands.sort()).toEqual(testBrands);
    })
    
});