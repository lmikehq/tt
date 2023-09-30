"use client"

import styled from "styled-components";
import { BlogHeroSection } from "./component/heroSection";
const BlogWrapper = styled.div`
  padding: 2rem 0;
`;

export const BlogPage = () => {
  return (
    <BlogWrapper>
      <BlogHeroSection />
    </BlogWrapper>
  );
};
