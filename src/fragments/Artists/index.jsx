import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Artists.css';

export class Artists extends Component {
  render() {
    const { artists } = this.props;

    return (
      <div className="Artists">
        {artists.map(artist => {
          return (
            <div key={artist.id || artist.name} className="artist">
              {artist.uri ? (
                <Link to={`/artist/${artist.uri.split(':')[2]}`}>
                  {artist.name}
                </Link>
              ) : (
                artist.name
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
