import {CoreAPI} from '../CoreAPI.js';

export class PlaylistAPI extends CoreAPI {
  getPlaylists(limit = 50) {
    return this.request('v1/me/playlists');
  }
}
