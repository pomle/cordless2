import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import auth from "./auth";

const app = express();
app.use(cors());
app.use("/auth", auth);

exports.api = functions.https.onRequest(app);
