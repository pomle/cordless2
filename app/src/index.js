import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

//import registerServiceWorker from './registerServiceWorker';

const ApplicationInstance = <App storage={window.localStorage} />;

ReactDOM.render(ApplicationInstance, document.getElementById("root"));
//registerServiceWorker();
