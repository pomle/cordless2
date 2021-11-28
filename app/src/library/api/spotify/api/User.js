import { CoreAPI } from './Core.js';

export class UserAPI extends CoreAPI {
  getMe() {
    return this.request(this.url('v1/me'));
  }

  getUser(userId) {
    return this.request(this.url(`v1/users/${userId}`));
  }
}
