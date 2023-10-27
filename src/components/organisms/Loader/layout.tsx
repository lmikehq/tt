"use client";

import React, { useState, useEffect } from "react";
import Loader from "@organism/Loader/loader";
import styled from "styled-components";

const LayoutWrapper = styled.div``;

interface LayoutProps {
  children: React.ReactNode;
}

const LoaderLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for demonstration purposes
    const timeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        setIsWindowLoaded(true);
      }
      setIsLoading(isWindowLoaded);
    }, 500); // Adjust the loading time as needed
    return () => clearTimeout(timeout);
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutWrapper>
        {isLoading ? <Loader /> : children}
    </LayoutWrapper>
  );
};

export default LoaderLayout;
