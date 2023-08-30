import { useState } from "react";
import styled from "styled-components";
import Flex from "./flex";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import map from "../../assets/images/map.png";
import { Divider } from "./divider";

interface MapBoxProps {
  zoom: number;
}

const MapBox = styled.div<MapBoxProps>`
  background-image: url(${map.src});
  width: 100%;
  height: 25rem;
  display: flex;
  padding: 2rem;
  background-size: ${(props) => props.zoom}%;
  border-radius: 12.5px;
`;

const MapHolder = styled.div`
    background: #FFFFFF;
    padding: .5rem;
`

function Map() {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 10);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 100));
  };

  return (
    <MapBox zoom={zoom}>
      <Flex
        align="flex-end"
        justify="flex-end"
        direction="column"
        gap=".5rem"
      >
        <MapHolder>
            <BsPlusLg color="#1B1B1B" cursor="pointer" size={25} onClick={handleZoomIn} />
            <Divider direction="horizontal"/>
            <BiMinus color="#1B1B1B" cursor="pointer" size={25} onClick={handleZoomOut} />
        </MapHolder>
      </Flex>
    </MapBox>
  );
}

export default Map;
