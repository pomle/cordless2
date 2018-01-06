import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { ViewContainer } from 'components/ViewContainer';
import { PlaylistDetail } from '../Playlist/Detail';
import { PlaylistIndex } from '../Playlist/Index';

export class Navigation extends Component {
  render() {
    const { player, playlistAPI, playbackAPI } = this.props;
    return (
      <div className="Navigation">
        <Switch>
          <Route
            path="/playlist/:playlistId/user/:userId"
            render={props => {
              const { playlistId, userId } = props.match.params;
              return (
                <ViewContainer>
                  <PlaylistDetail
                    playlistId={playlistId}
                    userId={userId}
                    player={player}
                    playlistAPI={playlistAPI}
                    playbackAPI={playbackAPI}
                  />
                </ViewContainer>
              );
            }}
          />
          <Route exact path="/playlist">
            <ViewContainer>
              <PlaylistIndex
                player={player}
                playlistAPI={playlistAPI}
                playbackAPI={playbackAPI}
              />
            </ViewContainer>
          </Route>
          <Route path="*">
            <Link to="/playlist">Playlists</Link>
          </Route>
        </Switch>
      </div>
    );
  }
}
