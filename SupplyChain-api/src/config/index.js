const {
    PORT = '',
    HOST_URL = '',
    MONGODB_URI = '',
    ETHEREUM_RPC = '',
    CONTRACT_ADDRESS = ''
} = process.env;

module.exports = {
    port: PORT,
    hostUrl: HOST_URL,
    mongodbUri: MONGODB_URI,
    ethereumRpc: ETHEREUM_RPC,
    address: CONTRACT_ADDRESS
};

