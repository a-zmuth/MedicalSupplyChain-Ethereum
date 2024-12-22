require('dotenv').config();
const Express = require('express');
const config = require('./config');
const { Web3 } = require('web3');
const Event = require('./model').Event;
const app = Express();
const ABI = require('./config/SupplyChainAbi');

const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ethereumRpc));
const contract = new web3.eth.Contract(ABI, config.address);

app.get('./Event', async (req, res) => {
    try {
        const address = req.query.address?.toLowerCase(); 
        if (!address) {
            return res.status(400).send({ error: 'Address query parameter is required' });
        }

        const events = await Event.find({
            $or: [
                { supplier: { $regex: new RegExp('^' + address, 'i') } },
                { deliveryCompany: { $regex: new RegExp('^' + address, 'i') } },
                { customer: { $regex: new RegExp('^' + address, 'i') } },
            ]
        });

        res.status(200).send(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

contract.events.allEvents({ fromBlock: 0 }, async (error, event) => {
    if (error) {
        console.error('Error listening to contract events:', error);
        return;
    }

    const values = event.returnValues;

    if (!values.index || !values.supplier || !values.deliveryCompany || !values.customer) {
        console.error('Missing required event data:', values);
        return;
    }

    try {
        console.log('Event received:', values);

        await Event.create({
            index: values.index,
            supplier: values.supplier,
            deliveryCompany: values.deliveryCompany,
            customer: values.customer,
            status: event.event 
        });

        console.log('Event saved successfully');
    } catch (err) {
        console.error('Error saving event to database:', err);
    }
});

module.exports = app;
