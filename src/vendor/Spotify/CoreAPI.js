export class CoreAPI {
  constructor(token) {
    this.base = 'https://api.spotify.com/';
    this.token = token;
  }

  async consume(request, callback) {
    do {
      const result = await request;
      request = null;

      if (result.items) {
        callback(result.items);
      }

      if (result.next) {
        request = this.request(result.next);
      }
    } while(request);
  }

  request(url, body = null, method = 'GET') {
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

  url(path) {
      return this.base + path;
  }
}
