import React, { Component } from 'react';
import { List } from 'immutable';

import {ViewHeader} from 'components/ViewHeader';
import {Tracklist} from 'fragments/Tracklist';
import {Track} from 'fragments/Track';

export class AlbumDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: null,
    };
  }

  async componentDidMount() {
    const { albumAPI: api, albumId } = this.props;

    const album = await api.getAlbum(albumId);
    this.setState({album});
 }

  playTrack = (track) => {
    const { playbackAPI } = this.props;
    playbackAPI.playAlbum(this.state.album.uri, track.uri);
  }

  updateFilter = (filter) => {
    this.setState({filter});
  }

  render() {
    const { player } = this.props;
    const { album } = this.state;

    if (!album) {
      return null;
    }

    return (
      <div className="AlbumDetail">
        <ViewHeader caption={album.name} images={album.images} />

        <Tracklist>
          {album.tracks.items.map(track => {
            return <Track key={track.id} track={track} play={this.playTrack} player={player} />;
          })}
        </Tracklist>
      </div>
    );
  }
}
