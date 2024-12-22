import Web3 from 'web3';

const ABI = require('../config/SupplyChain.abi');
const address = require ('../config').address;

const instance = new Web3(window.web3.currentProvider);

const DState = {
    instance, 
    contract: new instance.eth.Contract(ABI, address)
};

export default function(state = DState) {
    return state;
};