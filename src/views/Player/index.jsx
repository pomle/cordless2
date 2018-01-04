import { Component } from 'react';

import {createPlayer} from 'vendor/Spotify';
import {PlayerState} from './state.js';

export class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: new PlayerState(),
    };
  }

  async componentDidMount() {
    this.player = await createPlayer(this.props.token);

    const result = await this.player.connect();

    this.update(player => player.set('connected', result));

    this.player.on('ready', message => {
      this.update(player => player.onMessage({type: 'ready', message}));
    });
  }

  update(fn) {
    this.setState({
      player: fn(this.state.player),
    });
  }

  render() {
    return this.props.render(this.state.player);
  }
}
