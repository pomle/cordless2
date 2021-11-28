import React, { PureComponent } from "react";
import { withRouter, Link, Route, Switch } from "react-router-dom";

import { ViewContainer } from "components/ViewContainer";

import {
  AlbumRoute,
  ArtistRoute,
  PlaylistRoute,
  SearchRoute,
  UserPlaylistsRoute,
} from "./Routes";
import HomeView from "views/Home";
import MyPlaylists from "views/Me/MyPlaylists";

import { TrackInfo } from "views/TrackInfo";

import "./Navigation.css";

export const Navigation = withRouter(
  class Navigation extends PureComponent {
    render() {
      return (
        <div className="Navigation">
          <ViewContainer>
            <Switch>
              <Route path="/album/:albumId" component={AlbumRoute} />
              <Route path="/artist/:artistId" component={ArtistRoute} />
              <Route
                path="/user/:userId/playlist/:playlistId"
                component={PlaylistRoute}
              />
              <Route path="/user/:userId" component={UserPlaylistsRoute} />

              <Route exact path="/playlists" component={MyPlaylists} />

              <Route path="/search/:query?" component={SearchRoute} />

              <Route path="/track-info" component={TrackInfo} />

              <Route exact path="/" component={HomeView} />
            </Switch>
          </ViewContainer>
        </div>
      );
    }
  }
);
