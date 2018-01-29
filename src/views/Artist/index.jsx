import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ViewHeader } from 'components/ViewHeader';
import { AlbumList } from 'fragments/AlbumList';

import { fetchArtist } from 'store';

export class ArtistDetail extends Component {
  componentWillMount() {
    this.props.fetchArtist(this.props.artistId);
  }

  render() {
    const { artist } = this.props;

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
    return {
      artist: state.artist.getEntry(artistId),
    };
  },
  {
    fetchArtist,
  }
)(ArtistDetail);
