import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { ViewContainer } from 'components/ViewContainer';
import { PlaylistDetail } from '../Playlist/Detail';
import { PlaylistIndex } from '../Playlist/Index';

export class Navigation extends Component {
  render() {
    const { player, playlistAPI, playbackAPI } = this.props.applicationState;
    return (
      <div className="Navigation">
        <ViewContainer>
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
        </ViewContainer>
      </div>
    );
  }
}
