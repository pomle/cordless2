import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Track extends Component {
  play = () => {
    this.props.play(this.props.track);
  };

  render() {
    const { track } = this.props;

    return (
      <div className="Track">
        <div>
          <button onClick={this.play}>Play</button>
        </div>
        <div className="name">
          {track.name}
        </div>
        <div className="artists">
          {track.artists.map(artist => {
            return <div className="artist">
              <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
            </div>;
          })}
        </div>
        <div className="album">
          <Link to={`/album/${track.album.id}`}>{track.album.name}</Link>
        </div>
      </div>
    );
  }
}
