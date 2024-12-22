import {
  hostUri, apiKey
} from '../config/index';
import { fetch } from '../lib/util';

class Api {

  constructor(hostUri, apiKey) {
    this.hostUri = hostUri;
    this.apiKey = apiKey;
  }

  get host() {
    return new URL(this.hostUri);
  }

  async get() {

    let url = this.host;
    // url.pathname += 'user';
    // url.searchParams.append('coin', coin);

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': this.hostUri,
        'Authorization': this.apiKey
      }
    };

    return await fetch(url.toString(), options);
  };

}

const api = new Api(hostUri, apiKey);

export default api;