import { deliveryOptionService } from '../deliveryOption.service';

describe('Check if delivery option service is working as inteded', () => {
    
    test('Check if correct amount of delivery options are returned', async () => {
        expect.assertions(1);

        const deliveryOptions = await deliveryOptionService.getAll();

        expect(deliveryOptions).toHaveLength(4);
    });

    test('Check if correct delivery options are returned', async () => {
        expect.assertions(1);

        const testOptions = [
            {
                _id: 0,
                name: 'Saver',
                price: 0,
                minDeliverySpeed: 5,
                maxDeliverySpeed: 7
            },
            {
                _id: 1,
                name: 'Standard',
                price: 599,
                minDeliverySpeed: 3,
                maxDeliverySpeed: 5
            },
            {
                _id: 2,
                name: 'Priority',
                price: 1099,
                minDeliverySpeed: 2,
                maxDeliverySpeed: 3
            },
            {
                _id: 3,
                name: 'Expedited',
                price: 1599,
                minDeliverySpeed: 1,
                maxDeliverySpeed: 2
            }
        ].sort();

        const deliveryOptions = await deliveryOptionService.getAll();
        expect(deliveryOptions.sort()).toEqual(testOptions);
    });
})