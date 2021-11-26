import React, { Component } from "react";

import { Image } from "fragments/Image";

import "./ViewHeader.css";

export default function ViewHeader({ caption, images, children }) {
  return (
    <header className="ViewHeader">
      {images ? (
        <div className="image">
          <Image candidates={images} />
        </div>
      ) : null}

      <div>
        <h2>{caption}</h2>
      </div>

      <div>{children}</div>
    </header>
  );
}
