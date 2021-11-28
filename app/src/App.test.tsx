import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const fakeStorage = {
  items: new Map(),
  getItem(key: string) {
    return this.items.get(key);
  },
  setItem(key: string, value: string) {
    this.items.set(key, value);
  },
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App storage={fakeStorage} />, div);
});
