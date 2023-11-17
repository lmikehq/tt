import toast, { Toast } from "react-hot-toast";
import React from "react";
import Flex from "@components/templates/flex";
import { BiErrorCircle } from "react-icons/bi";
import Text from "@atom/text";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

const Circle = styled.div<{ color: string }>`
  padding: .5rem;
  display: flex;
  align-items: center;
  background-color: ${(({ color }) => color)};
  border-radius: 100%;
`;

const ToastBox = styled.div<{ type: string }>`
    width: 100%;
    background: ${({ type }) => (type === 'warning' ? 'white' : '#F3FAFD')};
    border-width: ${({ type }) => (type === 'warning' ? '1px 1px 1px 6px' : '0 0 0 6px')};
    border-style: solid;
    border-color: ${({ type }) => (type === 'warning' ? '#A0001D' : '#6092A7')};
    padding: 1.5rem;
    border-radius: 10px;
    margin: 1rem 0;
`;

export const ToastInfo = ({ type, message }: { type: 'warning' | 'info'; message?: string }) => {
    const { isMobile } = useScreenResolution()
  return (
    <ToastBox type={type}>
      <Flex align="center" gap="2rem">
        {isMobile ? null :
            type === 'warning' ? (
          <Circle color="#ffe4e9">
            <HiOutlineLightBulb size={isMobile ? 30 : 30} color="#A0001D" />
          </Circle>
        ) : (
          <Circle color="#DAF0F9">
            <HiOutlineLightBulb size={isMobile ? 30 : 30} color="#6092A7" />
          </Circle>
        )}
        <Text
            type="p"
            text={type === 'warning'
                ? "Infant passengers are not eligible for checked baggage."
                : message ?? "Save up to 20% on airline fees by purchasing your checked baggage in advance, rather than waiting until after you've completed your booking."
            }
            color={type === 'warning' ? '#A0001D' : '#06062A'}
            size={isMobile ? 14 : 16}
        />
      </Flex>
    </ToastBox>
  );
};

  
