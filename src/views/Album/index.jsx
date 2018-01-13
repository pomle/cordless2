import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewHeader } from 'components/ViewHeader';
import { Tracklist } from 'fragments/Tracklist';
import { Track } from 'fragments/Track';

export class AlbumDetail extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.albumAPI = context.api.albumAPI;
    this.playbackAPI = context.api.playbackAPI;

    this.state = {
      album: null,
    };
  }

  async componentDidMount() {
    const { albumId } = this.props;

    const album = await this.albumAPI.getAlbum(albumId);
    this.setState({ album });
  }

  playTrack = track => {
    const { albumId } = this.props;
    this.playbackAPI.playAlbum(albumId, track.id);
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { album } = this.state;

    if (!album) {
      return null;
    }

    return (
      <div className="AlbumDetail">
        <ViewHeader caption={album.name} images={album.images} />

        <Tracklist>
          {album.tracks.items.map(track => {
            return (
              <Track
                key={track.id}
                track={track}
                play={this.playTrack}
              />
            );
          })}
        </Tracklist>
      </div>
    );
  }
}
