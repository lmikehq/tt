import React from "react";
import { MapBoxTag, Span } from "../../styles";

function MapBox() {
  return (
    <>
      <MapBoxTag>
        <Span style={{ width: "100%", height: "100%" }}></Span>
      </MapBoxTag>
    </>
  );
}

export default MapBox;
