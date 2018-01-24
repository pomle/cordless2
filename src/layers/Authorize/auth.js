import { parse } from 'query-string';

const SESSION_STORAGE_KEY = 'session2';
const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER;

const SCOPE = [
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
];

function createImplicitFlowURL(clientId, callbackURL) {
  return (
    'https://accounts.spotify.com/authorize?' +
    [
      ['client_id', clientId],
      ['redirect_uri', callbackURL],
      ['response_type', 'token'],
      [
        'scope',
        SCOPE.join(' '),
      ],
    ]
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
  );
}

export function createAuthURL() {
  if (AUTH_SERVER) {
    return AUTH_SERVER + '/login?scope=' + SCOPE.join(' ');
  } else {
    const CLIENT_ID = 'a7cf3dcdfbd64bd5ac8d960caabbc890';
    const CALLBACK_URL = process.env.REACT_APP_SITE_URL || 'http://localhost:3000/';
    return createImplicitFlowURL(CLIENT_ID, CALLBACK_URL);
  }
}

export function getSession(storage) {
  try {
    const data = JSON.parse(storage.getItem(SESSION_STORAGE_KEY));
    if (data) {
      return data.session;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function putSession(storage, session) {
  const data = {
    session,
  };

  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
}

export function purgeSession(storage) {
  storage.removeItem(SESSION_STORAGE_KEY);
}

export function refreshToken(refreshTokenThatIsNotAccessToken) {
  const url = AUTH_SERVER + '/refresh_token?refresh_token=' + refreshTokenThatIsNotAccessToken;
  return fetch(url).then(response => response.json());
}
