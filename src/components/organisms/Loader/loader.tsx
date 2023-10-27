"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "@atom/image";
import { ttColors } from "@lib/theme/colors";
import Text from "@atom/text";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: "fff";
  flex-direction: column;
`;

interface LoaderProps {
  logo?: string;
}

const Loader: React.FC<LoaderProps> = ({ logo }) => {
  return (
    <LoaderWrapper>
        <Image
            src={"/assets/images/airplaneIcon.gif"}
            alt="logo"
            width={150}
            height={150}
        />
        <Text type="h3" text="THRILLERS TRAVELS" color={ttColors.primary} />
    </LoaderWrapper>
  );
};
export default Loader;
