import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import { ViewHeader } from 'components/ViewHeader';
import { AlbumList } from 'fragments/AlbumList';

export class ArtistDetail extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.artistAPI = context.api.artistAPI;
    this.playbackAPI = context.api.playbackAPI;

    this.state = {
      artist: null,
      albums: new List(),
    };
  }

  componentDidMount() {
    const { artistId } = this.props;

    this.artistAPI.consume(this.artistAPI.getAlbums(artistId), items => {
      this.setState(prevState => {
        return { albums: prevState.albums.push(...items) };
      });
    });

    this.artistAPI.getArtist(artistId)
    .then(artist => {
      this.setState({ artist });
    });
  }

  playTrack = track => {
    const { albumId } = this.props;
    this.playbackAPI.playAlbum(albumId, track.id);
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { artist, albums } = this.state;
    console.log(albums);

    if (!artist) {
      return null;
    }

    return (
      <div className="ArtistDetail">
        <ViewHeader caption={artist.name} images={artist.images} />

        <AlbumList albums={albums}/>
      </div>
    );
  }
}
