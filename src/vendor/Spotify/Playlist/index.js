import { CoreAPI } from '../CoreAPI.js';

export class PlaylistAPI extends CoreAPI {
  getPlaylists(limit = 500) {
    return this.request(this.url('v1/me/playlists'));
  }

  getPlaylistTracks(userId, playlistId) {
    return this.request(
      this.url(`v1/users/${userId}/playlists/${playlistId}/tracks`)
    );
  }
}
