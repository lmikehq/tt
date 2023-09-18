"use client";

import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import Text from "@atom/text";
import Breadcrumb from "@atom/breadcrumb";

const CountryInformationHeader = styled.div`
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
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;

    font-style: normal;
    font-weight: 700;
    font-size: 54px;
    line-height: 96px;

    text-shadow: 0px 4px 79px rgba(0, 0, 0, 0.25);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: #06062a94;
`;

const CountryInformationHead = ({
  cover,
  title,
}: {
  cover: StaticImageData;
  title: string;
}) => {
  return (
    <>
      <CountryInformationHeader>
        <Image src={cover} alt="nigeriaFlag" />
        <Overlay />
        <Text text={title} type="h2" transform="uppercase" />
      </CountryInformationHeader>
      <Breadcrumb />
    </>
  );
};

export default CountryInformationHead;
