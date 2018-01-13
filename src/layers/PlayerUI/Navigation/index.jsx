import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { ViewContainer } from 'components/ViewContainer';
import { AlbumDetail } from 'views/Album';
import { PlaylistDetail } from 'views/Playlist/Detail';
import { PlaylistIndex } from 'views/Playlist/Index';
import { Search } from 'views/Search';

import './Navigation.css';

export class Navigation extends Component {
  render() {
    return (
      <div className="Navigation">
        <ViewContainer>
          <Switch>
            <Route
              path="/album/:albumId"
              render={props => {
                const { albumId } = props.match.params;
                return <AlbumDetail albumId={albumId}/>
              }}
            />
            <Route
              path="/user/:userId/playlist/:playlistId"
              render={props => {
                const { userId, playlistId } = props.match.params;
                return <PlaylistDetail userId={userId} playlistId={playlistId} />;
              }}
            />

            <Route exact path="/playlist">
              <PlaylistIndex />
            </Route>

            <Route path="/search/:query?" render={({history, match}) => {
              return <Search
                query={match.params.query}
                onQuery={query => history.replace(`/search/${encodeURIComponent(query)}`)}
              />
            }}/>

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
