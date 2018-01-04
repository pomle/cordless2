import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Playlist } from 'views/Playlist';

export class PlayerUI extends Component {
  render() {
    const { player, playlistAPI, playbackAPI } = this.props;

    return (
      <div className="PlayerUI">
        <Switch>
          <Route path='/playlist/:playlistId'>

          </Route>
          <Route path='*'>
            <Playlist
              player={player}
              playlistAPI={playlistAPI}
              playbackAPI={playbackAPI}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
