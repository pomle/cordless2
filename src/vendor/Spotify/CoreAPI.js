export class CoreAPI {
  constructor(token) {
    this.url = 'https://api.spotify.com/';
    this.token = token;
  }

  request(path, body = null, method = 'GET') {
    const url = this.url + path;

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    const req = new Request(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
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
