import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";

import ViewHeader from "components/ViewHeader";
import { useStoreContext } from "render/context/StoreContext";

export default function HomeView() {
  const { recommendations } = useStoreContext();
  console.log(recommendations);

  return (
    <div className="HomeView">
      <ViewHeader caption="Home" />
    </div>
  );
}
