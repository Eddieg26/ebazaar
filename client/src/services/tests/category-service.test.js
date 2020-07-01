import { categoryService } from '../category.service';

describe('Check if category service is working as inteded', () => {

    test('Check if correct amount of categories are returned', async () => {
        expect.assertions(1);

        const categories = await categoryService.getAll();

        expect(categories).toHaveLength(4);
    });

    test('Check if correct categories are returned', async () => {
        expect.assertions(1);

        const testCategories = [
            {
                _id: 0,
                name: 'Audio'
            },
            {
                _id: 1,
                name: 'Smartphones'
            },
            {
                _id: 2,
                name: 'Accessories'
            },
            {
                _id: 3,
                name: 'Tvs'
            }
        ].sort();

        const categories = await categoryService.getAll();
        expect(categories.sort()).toEqual(testCategories);
    });
})