const playerPromise = new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('ready');
        resolve(window.Spotify);
    };
});

export async function getSpotify() {
    return playerPromise;
}

export async function createPlayer() {
    const Spotify = await getSpotify();
    const player = new Spotify.Player({
        name: "Cordless",
        getOAuthToken: callback => {
            // Run code to get a fresh access token
            callback("access token here");
        },
        volume: 0.5
    });
    return player;
}

export function createAuthorizationURL(clientId) {
  return 'https://accounts.spotify.com/authorize?' +
    [
      ['client_id', clientId],
      ['redirect_uri', 'http://localhost:3000/spotify/auth-callback'],
      ['response_type', 'token'],
      [
        'scope',
        [
          'user-read-private',
          'streaming',
        ].join(' ')
      ]
    ].map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
}
