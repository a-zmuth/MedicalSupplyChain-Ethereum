const {
  REACT_APP_API,
  REACT_API_KEY = 'key',
  REACT_APP_ADDRESS = '0x7106A6d32a30eA41D25A1d5dcC03d08F70bA4B99'
} = process.env;

module.exports = {
  hostUri: REACT_APP_API,
  apiKey: REACT_API_KEY,
  address: REACT_APP_ADDRESS
};