import { CoreAPI } from '../CoreAPI.js';

export class PlaybackAPI extends CoreAPI {
  playContext(contextURI, device_id) {
    if (!device_id) {
      throw new TypeError('Device id argument missing');
    }

    return this.request(
      this.url(`v1/me/player/play?device_id=${device_id}`),
      {
        context_uri: contextURI,
      },
      'PUT'
    );
  }
}
