import React, { PureComponent } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';

import { ViewContainer } from 'components/ViewContainer';

import {AlbumRoute, ArtistRoute, PlaylistRoute} from './Routes';
import PlaylistIndex from 'views/Playlist/Index';
import Search from 'views/Search';
import { TrackInfo } from 'views/TrackInfo';

import './Navigation.css';

export const Navigation = withRouter(class Navigation extends PureComponent {
  render() {
    return (
      <div className="Navigation">
        <ViewContainer>
          <Switch>
            <Route path="/album/:albumId" component={AlbumRoute} />
            <Route path="/artist/:artistId" component={ArtistRoute} />
            <Route path="/user/:userId/playlist/:playlistId" component={PlaylistRoute} />

            <Route exact path="/playlists">
              <PlaylistIndex />
            </Route>

            <Route
              path="/search/:query?"
              render={({ history, match }) => {
                return (
                  <Search
                    query={match.params.query}
                    onQuery={query =>
                      history.replace(`/search/${encodeURIComponent(query)}`)
                    }
                  />
                );
              }}
            />

            <Route path="/track-info">
              <TrackInfo />
            </Route>

            <Route exact path="/">
              <ul>
                <li>
                  <Link to="/search">Search</Link>
                </li>
                <li>
                  <Link to="/playlists">Playlists</Link>
                </li>
                <li>
                  <Link to="/now-playing">Now Playing</Link>
                </li>
                <li>
                  <Link to="/track-info">Track Info</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </Route>
          </Switch>
        </ViewContainer>
      </div>
    );
  }
});
