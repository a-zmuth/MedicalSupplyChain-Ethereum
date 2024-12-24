require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const config = require('./config');
const { Web3 } = require('web3');
const Order = require('./model').Order;
const app = Express();
const ABI = require('./config/SupplyChainAbi');

app.use(cors());

const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ethereumRpc));
const contract = new web3.eth.Contract(ABI, config.address);

app.get('/orders', async (req, res) => {
    const address = req.query.address;
    const regex = new RegExp('^' + address.toLowerCase(), 'i');
    const orders = await Order.find ({
        $or: [
            {supplier: { $regex: regex } },
            {deliveryCompany: { $regex: regex } },
            {customer: { $regex: regex } }
        ]
    });
    res.send(orders);
})

contract.events.OrderCreated({fromBlock: 0}, (error, event) =>{
    if (error) console.log(error);
    event = JSON.parse(JSON.stringify(event));
    const values = event.retunrValues;
    console.log(values);
    Order.create({
        index: values.index,
        supplier: values.supplier,
        deliveryCompany: values.deliveryCompany,
        customer: values.customer,
    })
});

module.exports = app;