import Flex from "@/components/templates/flex";

import User from "/public/assets/images/blog/user.png";
import BlogMiniImg from "/public/assets/images/blog/blogImgMini.png";
import BlogCardMini from "./blogArticle";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Link from "@/components/atoms/link";

export const BlogArticleMini = () => {
    const { isMobile } = useScreenResolution();

    return (
        <>
            <Flex
                justify="space-between"
                direction={isMobile ? "column" : "row"}
                gap={isMobile ? "2.5rem" : "1.5rem"}
            >
                <Link href="/blog/preview">
                    {/* <BlogCardMini
            userImageSrc={User} blog={undefined}         
          /> */}
                </Link>
                <Link href="/blog/preview">
                    {/* <BlogCardMini
            imageSrc={BlogMiniImg.src}
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
          /> */}
                </Link>
            </Flex>
        </>
    );
};
