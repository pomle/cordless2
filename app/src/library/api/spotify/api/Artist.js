import { CoreAPI } from './Core.js';

export class ArtistAPI extends CoreAPI {
  getArtist(artistId) {
    return this.request(this.url(`v1/artists/${artistId}`));
  }

  getAlbums(artistId) {
    return this.request(this.url(`v1/artists/${artistId}/albums`));
  }

  getRelatedArtists(artistId) {
    return this.request(this.url(`v1/artists/${artistId}/related-artists`));
  }

  getTopTracks(artistId) {
    return this.request(this.url(`v1/artists/${artistId}/top-tracks`));
  }
}
