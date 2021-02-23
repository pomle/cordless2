import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { PlayButton } from "components/PlayButton";
import { Image } from "fragments/Image";

import { playAlbum } from "store";

import "./Album.css";

export const Album = connect(null, { playAlbum })(
  class Album extends Component {
    play = () => {
      const { album, playAlbum } = this.props;
      playAlbum(album.get("id"));
    };

    render() {
      const { album } = this.props;

      const albumURL = `/album/${album.get("id")}`;

      return (
        <div className="Album">
          <Link component="div" className="image" to={albumURL}>
            <Image candidates={album.get("images")} />
          </Link>

          <div className="name">
            <Link to={albumURL}>{album.get("name")}</Link>
          </div>

          <div className="playback">
            <PlayButton onClick={this.play} />
          </div>
        </div>
      );
    }
  }
);
