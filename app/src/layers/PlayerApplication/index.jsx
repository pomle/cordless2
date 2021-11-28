import React, { Component } from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import { createStore, setToken } from "store";

import PlayerWindow from "./PlayerWindow";

import { LRUCache } from "library/cache";
import { ImagePool } from "library/ImagePool";
import StoreContext from "render/context/StoreContext";

export class PlayerApplication extends Component {
  static childContextTypes = {
    images: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.images = new ImagePool(new LRUCache(1000));

    this.store = createStore();
    this.handleToken(props.token);
  }

  componentDidUpdate() {
    this.handleToken(this.props.token);
  }

  getChildContext() {
    return {
      images: this.images,
    };
  }

  handleToken(token) {
    this.store.dispatch(setToken(token));
  }

  render() {
    return (
      <Provider store={this.store}>
        <StoreContext>
          <PlayerWindow />
        </StoreContext>
      </Provider>
    );
  }
}
