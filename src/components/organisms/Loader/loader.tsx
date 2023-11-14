"use client";

import React from "react";
import styled from "styled-components";
import Image from "@atom/image";
import { ttColors } from "@lib/theme/colors";
import Text from "@atom/text";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

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
  background: "white";
  flex-direction: column;
`;

interface LoaderProps {
  logo?: string;
}

const Loader: React.FC<LoaderProps> = ({ logo }) => {
    const { isMobile } = useScreenResolution()
    return (
        <LoaderWrapper>
            <Image
                src={"/assets/images/airplaneIcon.gif"}
                alt="logo"
                width={isMobile ? 120 : 150}
                height={isMobile ? 120 : 150}
            />
            <Text type="h3" text="THRILLERS TRAVELS" color={ttColors.primary} size={isMobile ? 18 : 18} weight={600} />
        </LoaderWrapper>
    );
};
export default Loader;
