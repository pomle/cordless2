import { CoreAPI } from './Core.js';

export class SearchAPI extends CoreAPI {
  search(type, query, limit = 50) {
    const params = [
      ['type', type],
      ['limit', limit],
      ['q', query],
    ];
    return this.request(this.url('v1/search', params));
  }
}
