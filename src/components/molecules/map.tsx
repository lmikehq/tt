"use client";
import { useState } from "react";
import styled from "styled-components";
import Flex from "@components/templates/flex";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { Divider } from "@atom/divider";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

interface MapBoxProps {
  zoom: number;
  isMobile?: boolean;
}

const MapBox = styled.div<MapBoxProps>`
  background-image: url(${"/assets/images/map.png"});
  width: 100%;
  height: ${(props) => (props.isMobile ? "auto" : "30rem")};
  display: flex;
  padding: 2rem;
  background-size: ${(props) => props.zoom}%;
  background-repeat: no-repeat;
  border-radius: 12.5px;
`;

const MapHolder = styled.div`
  background: #ffffff;
  padding: 0.5rem;
`;

function Map() {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 10);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 100));
  };

  const { isMobile } = useScreenResolution();

  return (
    <MapBox zoom={zoom} isMobile={isMobile}>
      <Flex align="flex-end" justify="flex-end" direction="column" gap=".5rem">
        <MapHolder>
          <BsPlusLg
            color="#1B1B1B"
            cursor="pointer"
            size={25}
            onClick={handleZoomIn}
          />
          <Divider direction="horizontal" />
          <BiMinus
            color="#1B1B1B"
            cursor="pointer"
            size={25}
            onClick={handleZoomOut}
          />
        </MapHolder>
      </Flex>
    </MapBox>
  );
}

export default Map;
