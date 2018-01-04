const CLIENT_ID = 'a7cf3dcdfbd64bd5ac8d960caabbc890';

const playerPromise = new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('onSpotifyWebPlaybackSDKReady');
        resolve(window.Spotify);
    };
});

export async function getSpotify() {
    return playerPromise;
}

export async function createPlayer(token) {
    const Spotify = await getSpotify();
    const player = new Spotify.Player({
        name: "Cordless",
        getOAuthToken: callback => {
            callback(token);
        },
        volume: 1
    });
    return player;
}

export function createAuthorizationURL() {
  console.log(window.location);
  return 'https://accounts.spotify.com/authorize?' +
    [
      ['client_id', CLIENT_ID],
      ['redirect_uri', window.location.href],
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
