const REACT_APP_API = process.env.REACT_APP_API || 'http://localhost:8080';
const REACT_API_KEY = process.env.REACT_API_KEY || 'key';
const REACT_APP_ADDRESS = process.env.REACT_APP_ADDRESS || '0x7106A6d32a30eA41D25A1d5dcC03d08F70bA4B99';

module.exports = {
  hostUri: REACT_APP_API,
  apiKey: REACT_API_KEY,
  address: REACT_APP_ADDRESS,
};