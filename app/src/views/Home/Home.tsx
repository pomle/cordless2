import React, { Component } from "react";
import { useSelector } from "react-redux";

import ViewHeader from "components/ViewHeader";
import { fetchAlbum, playAlbum } from "store";

export default function HomeView() {
  return (
    <div className="HomeView">
      <ViewHeader caption="Home" />
    </div>
  );
}
