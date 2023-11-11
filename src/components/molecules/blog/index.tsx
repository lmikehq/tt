"use client"

import styled from "styled-components";
import { BlogHeroSection } from "./component/heroSection";
import { AdminPost } from "./component/adminPost";
import { Preview } from "@/app/blog/preview";
const BlogWrapper = styled.div`
  padding: 2rem 0;
`;

export const BlogPage = () => {
  return (
    <BlogWrapper>
      <BlogHeroSection />
      {/* <AdminPost /> */}
    </BlogWrapper>
  );
};
