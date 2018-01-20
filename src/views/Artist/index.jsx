import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ViewHeader } from 'components/ViewHeader';
import { AlbumList } from 'fragments/AlbumList';

import { fetchArtist } from 'layers/PlayerApplication/store/artist';

export class ArtistDetail extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.playbackAPI = context.api.playbackAPI;

    this.state = {
      artist: null,
    };
  }

  componentWillMount() {
    console.log(this.props);
    this.props.fetchArtist(this.props.artistId);
  }

  playTrack = track => {
    const { albumId } = this.props;
    this.playbackAPI.playAlbum(albumId, track.id);
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { artist } = this.props;
    console.log('Artist view', artist);

    if (!artist) {
      return null;
    }

    return (
      <div className="ArtistDetail">
        <ViewHeader caption={artist.get('name')} images={artist.get('images')} />

        <AlbumList albums={artist.getIn(['albums', 'items'], [])} />
      </div>
    );
  }
}

export default connect(
  (state, {artistId}) => {
    console.log(state.artist, artistId);
    return {
      artist: state.artist.getEntry(artistId),
    };
  },
  {
    fetchArtist,
  }
)(ArtistDetail);
