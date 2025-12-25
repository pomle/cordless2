import React from "react";

import { Image } from "fragments/Image";

import "./ViewHeader.css";

interface ViewHeaderProps {
  caption: React.ReactNode;
  images?: any;
  children?: React.ReactNode;
}

export default function ViewHeader({
  caption,
  images,
  children,
}: ViewHeaderProps) {
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
