import Flex from "@/components/templates/flex";

import User from "../../../../../public/assets/images/blog/user.png";
import BlogCardMini from "./blogArticle";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

export const BlogArticleMini = () => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Flex
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap="1.5rem"
      >
        <BlogCardMini
          imageSrc="../../../../../public/assets/images/blog/blogImgMini.png"
          userImageSrc={User}
          authorName="Seun Adebayo"
          authorRole="Admin Thrillers"
          date="Sept 4"
          title="10 Essential Travel Tips for a Stress-Free Vacation"
          content="Traveling can be a breeze with the right preparation. From packing also a breeze ...."
          category="TRAVEL TRIPS"
          readTime="6 mins read"
          likes="1.3k"
          dislikes="..."
          upvote="..."
        />
        <BlogCardMini
          imageSrc="../../../../../public/assets/images/blog/blogImgMini.png"
          userImageSrc={User}
          authorName="Seun Adebayo"
          authorRole="Admin Thrillers"
          date="Sept 4"
          title="10 Essential Travel Tips for a Stress-Free Vacation"
          content="Traveling can be a breeze with the right preparation. From packing also a breeze ...."
          category="TRAVEL TRIPS"
          readTime="6 mins read"
          likes="1.3k"
          dislikes="..."
          upvote="..."
        />
      </Flex>
    </>
  );
};
