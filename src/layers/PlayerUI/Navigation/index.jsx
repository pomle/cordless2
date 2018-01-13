import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { ViewContainer } from 'components/ViewContainer';
import { AlbumDetail } from 'views/Album';
import { PlaylistDetail } from 'views/Playlist/Detail';
import { PlaylistIndex } from 'views/Playlist/Index';
import { Search } from 'views/Search';

export class Navigation extends Component {
  render() {
    const {
      albumAPI,
      playlistAPI,
      playbackAPI,
      searchAPI,
    } = this.props.applicationState;

    return (
      <div className="Navigation">
        <ViewContainer>
          <Switch>
            <Route
              path="/album/:albumId"
              render={props => {
                const { albumId } = props.match.params;
                return (
                  <AlbumDetail
                    albumId={albumId}
                    albumAPI={albumAPI}
                    playbackAPI={playbackAPI}
                  />
                );
              }}
            />
            <Route
              path="/user/:userId/playlist/:playlistId"
              render={props => {
                const { userId, playlistId } = props.match.params;
                return (
                  <PlaylistDetail
                    userId={userId}
                    playlistId={playlistId}
                    playlistAPI={playlistAPI}
                    playbackAPI={playbackAPI}
                  />
                );
              }}
            />
            <Route exact path="/playlist">
              <PlaylistIndex
                playlistAPI={playlistAPI}
                playbackAPI={playbackAPI}
              />
            </Route>
            <Route path="/search">
              <Search playbackAPI={playbackAPI} searchAPI={searchAPI} />
            </Route>
            <Route path="*">
              <ul>
                <li>
                  <Link to="/search">Search</Link>
                </li>
                <li>
                  <Link to="/playlist">Playlists</Link>
                </li>
              </ul>
            </Route>
          </Switch>
        </ViewContainer>
      </div>
    );
  }
}
