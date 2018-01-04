export class API {
  constructor(token) {
    this.url = 'https://api.spotify.com/';
    this.token = token;
  }

  request(path, body = null, method = 'GET') {
    const url = this.url + path;

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    if (this.token) {
      headers.append("Authorization", `Bearer ${this.token}`);
    }

    const req = new Request(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    return fetch(req).then(response => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('application/json')) {
        return response.json();
      }

      return response.text();
    });
  }
}

export class PlaylistAPI extends API {
  getPlaylists(limit = 50) {
    return this.request('v1/me/playlists');
  }
}

export class PlaybackAPI extends API {
  playContext(contextURI, device_id) {
    if (!device_id) {
      throw new TypeError('Device id argument missing');
    }

    return this.request(`v1/me/player/play?device_id=${device_id}`, {
      context_uri: contextURI,
    }, 'PUT');
  }
}
