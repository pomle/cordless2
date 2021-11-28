import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import { Authorize } from "layers/Authorize";
import { PlayerApplication } from "layers/PlayerApplication";

import "./App.css";

interface AppProps {
  storage: Storage;
}

export default function App({ storage }: AppProps) {
  return (
    <BrowserRouter>
      <div className="App">
        <Authorize
          storage={storage}
          render={(token: any) => {
            return <PlayerApplication token={token} />;
          }}
        />
      </div>
    </BrowserRouter>
  );
}
