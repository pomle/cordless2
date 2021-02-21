import * as functions from "firebase-functions";
import auth from "./auth";

exports.auth = functions.https.onRequest(auth);
