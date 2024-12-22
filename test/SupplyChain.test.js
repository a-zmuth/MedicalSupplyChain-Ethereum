const _supply_chain = require("../migrations/2_supply_chain");

const MedicalSupplyChain = artifacts.require('MedicalSupplyChain');

contract('MedicalSupplyChain', async (accounts) => {
    
    // Parties involved
    const supplier = accounts[0];
    const deliveryCompany = accounts[1];
    const customer = accounts[2];

    // Order details
    const title = 'Devices';
    const description = 'Pace maker';

    //Statuses
    const CREATED = 0;
    const DELIVERING = 1;
    const DELIVERED = 2;
    const ACCEPTED = 3;
    const DECLINED = 4;

    //Indexes
    const orderIndex = 0;
    
    it('1. Create new order', async () => {
        const instance = await MedicalSupplyChain.deployed();

        // Create an order
        await instance.createOrder(title, description, deliveryCompany, customer);

        // Retrieve the created order
        const order = await instance.getOrder(orderIndex);

        console.log(order);

        // Access fields by index, not as object keys
        assert.equal(order[0], title, 'Order title is incorrect');
        assert.equal(order[1], description, 'Order description is incorrect');
        assert.equal(order[2], supplier, 'Supplier address is incorrect');
        assert.equal(order[3], deliveryCompany, 'Delivery company address is incorrect');
        assert.equal(order[4], customer, 'Customer address is incorrect');
        assert.equal(order[5], CREATED, 'Order status is not 0 (created)');
    });

    it('2. Start delivering order', async() => {
        const instance = await MedicalSupplyChain.deployed();
        await instance.startDeliveringOrder(orderIndex, {from: deliveryCompany});
        const order = await instance.getOrder(orderIndex);
        assert.equal(order[5], DELIVERING, 'Status is not 1 (Delivering)');
    })

    it('3. Stop delivering order', async() => {
        const instance = await MedicalSupplyChain.deployed();
        await instance.stopDeliveringOrder(orderIndex, {from: deliveryCompany});
        const order = await instance.getOrder(orderIndex);
        assert.equal(order [5], DELIVERED, 'Status is not 2 (Delivered)');
    });

    it('4. Customer accepts order', async() => {
        const instance = await MedicalSupplyChain.deployed();
        await instance.acceptOrder(orderIndex, {from: customer});
        const order = await instance.getOrder(orderIndex);
        assert.equal(ACCEPTED, order[5], 'Status is not 3 (Accepted)');
    });

    it('5. Customer can\'t decline accepted order', async() => {
        const instance = await MedicalSupplyChain.deployed();

        try {
            //Attempt to decline an order that's already been accepted
            await instance.declineOrder(0, {from: accounts[2]});
                assert.fail('Expected revert not received');
        } catch (error) {
            // check if the revert reason matches
            assert(
                error.message.includes('Order is not in Delivered status'),
               'Unexpected error message: ${error.message}'
            );
        }
    });

    it('6. Customer can decline delivered order', async() => {
        const instance = await MedicalSupplyChain.deployed();

        const newOrderIndex = orderIndex + 1;
        
        await instance.createOrder(title, description, deliveryCompany, customer);
        await instance.startDeliveringOrder(newOrderIndex, {from: deliveryCompany});
        await instance.stopDeliveringOrder(newOrderIndex, {from: deliveryCompany});
        await instance.declineOrder(newOrderIndex, {from: customer});

        const order = await instance.getOrder(newOrderIndex);

        assert.equal(order[5], DECLINED, 'Order status is not Declined');
    });

});
