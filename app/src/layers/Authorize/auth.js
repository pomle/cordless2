import { parse } from "query-string";

const SESSION_STORAGE_KEY = "session2";
const AUTH_URL = process.env.REACT_APP_AUTH_URL;

const SCOPE = [
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
];

export function createAuthURL() {
  if (!AUTH_URL) {
    throw new Error("No AUTH URL present");
  }
  
  return AUTH_URL + "login?scope=" + SCOPE.join(" ");
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

export function canRefresh() {
  return !!AUTH_URL;
}

export function refreshToken(refreshTokenThatIsNotAccessToken) {
  if (!canRefresh()) {
    throw new Error("Can not refresh without authentication server");
  }

  const url =
    AUTH_URL +
    "refresh_token?refresh_token=" +
    refreshTokenThatIsNotAccessToken;
  return fetch(url).then((response) => response.json());
}

export function parseQueryString(qs) {
  return parse(qs);
}
