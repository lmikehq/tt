"use client";

import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import Text from "@atom/text";
import Breadcrumb from "@organism/breadcrumb";
import { useScreenResolution } from "hook/useScreenResolution";

const AllCountryHeader = styled.div`
  position: relative;
  width: 100%;
  height: 332px;

  & img {
    width: 100%;
    object-fit: cover;
    height: 300px;
  }

  & h2 {
    position: absolute;
    top: 45%;
    text-transform: uppercase;
    left: 75%;
    transform: translate(-50%, -50%);
    color: #fff;
    width: max-content;
    background: #06062a80;
    text-align: center;
    font-weight: 700 !important;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    width: 25%;
    font-size: 54px;
    padding: 0px 1rem;
    line-height: 1.5em;
    text-shadow: 0px 4px 79px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    @media screen and (max-width: 900px) {
      font-size: 24px;
      left: 50% !important;
      width: 100%;
      background: transparent;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  // background: #06062a94;
  background: linear-gradient(
    90deg,
    rgb(0 0 0 / 10%) 45%,
    rgb(0 0 0 / 22%) 55%
  );
  @media screen and (max-width: 900px) {
    background: #06062a94;
  }
`;

const AllCountryHead = ({
  cover,
  title,
}: {
  cover: StaticImageData | string;
  title: string;
}) => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <AllCountryHeader style={{ height: isMobile ? "160px" : "250px" }}>
        <Image
          src={cover}
          alt=""
          style={{ height: isMobile ? "128px" : "230px" }}
        />
        <Overlay style={{ height: isMobile ? "128px" : "230px" }} />
        <Text
          text={title.slice(0, 20)}
          type="h2"
          transform="uppercase"
          styles={{ width: "max-content" }}
        />
      </AllCountryHeader>
      <Breadcrumb />
    </>
  );
};

export default AllCountryHead;
