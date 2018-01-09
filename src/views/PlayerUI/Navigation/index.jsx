import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { ViewContainer } from 'components/ViewContainer';
import { PlaylistDetail } from '../Playlist/Detail';
import { PlaylistIndex } from '../Playlist/Index';
import { Search } from '../Search';

export class Navigation extends Component {
  render() {
    const { albumAPI, playlistAPI, playbackAPI, searchAPI } = this.props.applicationState;

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
              path="/playlist/:playlistId/user/:userId"
              render={props => {
                const { playlistId, userId } = props.match.params;
                return (
                  <PlaylistDetail
                    playlistId={playlistId}
                    userId={userId}
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
              <Search playbackAPI={playbackAPI} searchAPI={searchAPI}/>
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
