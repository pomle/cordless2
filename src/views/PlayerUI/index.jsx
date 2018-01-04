import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { PlaylistDetail } from './Playlist/Detail';
import { PlaylistIndex } from './Playlist/Index';

export class PlayerUI extends Component {
  render() {
    const { player, playlistAPI, playbackAPI } = this.props;

    return (
      <div className="PlayerUI">
        <Switch>
          <Route
            path="/playlist/:playlistId/user/:userId"
            render={props => {
              const { playlistId, userId } = props.match.params;
              return (
                <PlaylistDetail
                  playlistId={playlistId}
                  userId={userId}
                  player={player}
                  playlistAPI={playlistAPI}
                  playbackAPI={playbackAPI}
                />
              );
            }}
          />
          <Route exact path="/playlist">
            <PlaylistIndex
              player={player}
              playlistAPI={playlistAPI}
              playbackAPI={playbackAPI}
            />
          </Route>
          <Route path="*">
            <Link to="/playlist">Playlists</Link>
          </Route>
        </Switch>
      </div>
    );
  }
}
