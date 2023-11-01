import Flex from "@/components/templates/flex";
import { BlogMini } from "./blogArticle";

export const BlogArticleMini = () => {
  return (
    <>
      <Flex justify="space-between" gap="1.5rem">
        <BlogMini />
        <BlogMini />
      </Flex>
    </>
  );
};
