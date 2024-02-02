"use client";

import Draggable from 'react-draggable';
import Flex from "../templates/flex";
import { BsArrowUp } from "react-icons/bs";
import { useRef } from "react";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";


export const ScrollToTop = () => {
  const nodeRef = useRef(null);
  const { isMobile } = useScreenResolution();

  const onClick = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0
    });
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{
          position: 'fixed',
          zIndex: 999,
          height: isMobile ? '60px' : '80px',
          width: isMobile ? '60px' : '80px',
          bottom: '20%',
          right: '45px',
          background: "#87CEEB",
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center'
        }}>
        <Flex
          onClick={onClick}
          align="center"
          justify="center"
        >
          <BsArrowUp color="#FFF" size={isMobile ? 25 : 37} fontWeight={600} />
        </Flex>
      </div>
    </Draggable>
  );
};