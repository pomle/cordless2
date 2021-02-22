/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
import * as functions from "firebase-functions";
import * as express from "express"; // Express web server framework
import * as request from "request"; // "Request" library
import * as querystring from "querystring";
import * as cookieParser from "cookie-parser";

const config = functions.config().spotify;
const clientId = config.client_id;
const clientSecret = config.client_secret;
const redirectURI = config.redirect_uri;
const playerURI = config.player_uri;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const stateKey = "__session";

const router = express.Router();

router.get("/login", (req, res) => {
  const state = generateRandomString(16);

  res.cookie(stateKey, state);
  res.setHeader("Cache-Control", "private");

  const scope = req.query.scope;

  const url =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: redirectURI,
      state: state,
    });

  res.redirect(url);
});

router.get("/callback", cookieParser(), (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    const url =
      playerURI +
      "/#" +
      querystring.stringify({
        error: "state_mismatch",
      });
    res.redirect(url);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirectURI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;
        const expiresIn = body.expires_in;

        // we can also pass the token to the browser to make requests from there
        const url =
          playerURI +
          "#" +
          querystring.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
          });

        res.redirect(url);
      } else {
        const url =
          playerURI +
          "#" +
          querystring.stringify({
            error: "invalid_token",
          });

        res.redirect(url);
      }
    });
  }
});

router.get("/refresh_token", (req, res) => {
  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (error) {
      console.error(error);
    }

    if (response.statusCode === 200) {
      res.send(body);
    } else {
      console.error(body);
    }
  });
});

export default router;
