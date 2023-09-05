"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import FlyingPlane from "@image/airplaneIcon.gif";
import Image from "../../atoms/image";
import { ttColors } from "theme/colors";
import Text from "src/components/atoms/text";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: "fff";
  flex-direction: column;
`;

interface LoaderProps {
  logo: string;
}

const Loader: React.FC<LoaderProps> = ({ logo }) => {
  return (
    <LoaderWrapper>
      <>
        <Image src={FlyingPlane} alt="logo" width={150} height={150} />
        <Text type="h3" text="THRILLERS TRAVELS" color={ttColors.primary} />
      </>
    </LoaderWrapper>
  );
};
export default Loader;
