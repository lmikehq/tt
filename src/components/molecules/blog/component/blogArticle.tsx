import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaThumbsUpSolid, LiaThumbsDown } from "react-icons/lia";
import { BsBoxArrowUp } from "react-icons/bs";

import User from "../../../../../public/assets/images/blog/user.png";
import BlogImg from "../../../../../public/assets/images/blog/blogImg.png";
import PropTypes from "prop-types";
import Link from "@/components/atoms/link";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { BlogInterface } from "@/lib/types/response-models/blog/index.type";
import dayjs from "dayjs";

interface BlogArticleProps {
  blog: BlogInterface;
}
export const BlogArticle = ({ blog }: BlogArticleProps) => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Link href="/blog/preview">
        <Flex direction="column" gap="1.5rem">
          <Image
            src={blog.blogImage}
            alt=""
            height={252}
            styles={{ borderRadius: "8px" }}
          />
          <Flex justify="space-between">
            <Flex justify="flex-start" gap="10px">
              <Image
                src={blog.author.picture ?? User}
                width={54}
                height={54}
                alt=""
              />
              <Flex justify="flex-start" direction="column" gap="5px">
                <Text
                  type="h3"
                  text={blog.author.name}
                  weight={500}
                  size="18px"
                  color="#000000"
                />
                <Flex justify="flex-start" gap="10px">
                  <Text
                    type="p"
                    text="Admin Thrillers"
                    weight={400}
                    size="16px"
                    color="#606060"
                  />
                  <Text
                    type="p"
                    text={dayjs(blog.createdAt).format("MMMM D")}
                    weight={400}
                    size="16px"
                    color="#606060"
                  />
                </Flex>
              </Flex>
            </Flex>
            {/* <BiDotsHorizontalRounded size="24px" /> */}
          </Flex>
          <Flex direction="column" gap="1rem">
            <Text type="h1" text={blog.title} size="22px" weight="600" />
            <Text
              type="p"
              text={blog.content}
              size="15px"
              weight="400"
              color="#121212"
            />
          </Flex>
          <Flex justify="space-between">
            <Flex justify="flex-start" align="center" gap="15px">
              <Text
                type="h3"
                text={blog.topic}
                size="15px"
                weight={600}
                color="#00E717"
              />
              <Text
                type="p"
                text="6 mins read"
                size="15px"
                color="#929292"
                styles={{ display: isMobile ? "none" : "flex" }}
              />
            </Flex>

            <Flex justify="flex-end" align="center" gap="10px">
              <LiaThumbsUpSolid color="#929292" size="19.25px" />
              <Text type="p" text="1.3k" color="#929292" />
              <LiaThumbsDown color="#929292" size="19.25px" />
              <BsBoxArrowUp color="#929292" size="19.25px" />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

const imagePropTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
};
interface BlogCardMiniProps {
  blog: BlogInterface;
  userImageSrc: PropTypes.InferProps<typeof imagePropTypes>;
}

const BlogCardMini: React.FC<BlogCardMiniProps> = ({ blog, userImageSrc }) => {
  const { isMobile } = useScreenResolution();

  return (
    <Flex direction="column" gap="1.2rem">
      <Flex
        justify="space-between"
        styles={{ display: isMobile ? "flex" : "none" }}
      >
        <Flex justify="flex-start" gap="10px" align="center">
          <Image
            src={blog.author.picture ?? userImageSrc.src}
            width={userImageSrc.width}
            height={userImageSrc.height}
            alt=""
          />
          <Flex justify="flex-start" direction="column" gap="0px">
            <Text
              type="h3"
              text={blog.author.name}
              weight={500}
              size={isMobile ? "16px" : "18px"}
              color="#000000"
            />
            <Flex justify="flex-start" gap={isMobile ? "5px" : "10px"}>
              <Text
                type="p"
                text="Admin Thrillers"
                weight={400}
                size={isMobile ? "14px" : "16px"}
                color="#606060"
              />
              <Text
                type="p"
                text={dayjs(blog.createdAt).format("MMMM D")}
                weight={400}
                size={isMobile ? "14px" : "16px"}
                color="#606060"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Image
        src={blog.blogImage}
        alt=""
        height={252}
        styles={{ borderRadius: "8px" }}
      />
      <Flex
        justify="space-between"
        styles={{ display: isMobile ? "none" : "flex" }}
      >
        <Flex justify="flex-start" gap="10px">
          <Image
            src={userImageSrc.src}
            width={userImageSrc.width}
            height={userImageSrc.height}
            alt=""
          />
          <Flex justify="flex-start" direction="column" gap="0px">
            <Text
              type="h3"
              text={blog.author.name}
              weight={500}
              size="18px"
              color="#000000"
            />
            <Flex justify="flex-start" gap="10px">
              <Text
                type="p"
                text={"Admin Thrillers"}
                weight={400}
                size="16px"
                color="#606060"
              />
              <Text
                type="p"
                text={dayjs(blog.createdAt).format("MMMM D")}
                weight={400}
                size="16px"
                color="#606060"
              />
            </Flex>
          </Flex>
        </Flex>
        <BsBoxArrowUp color="#929292" size="19.25px" />
      </Flex>

      <Flex direction="column" gap="1rem">
        <Text type="h1" text={blog.title} size="20px" weight="600" />
        <Text
          type="p"
          text={blog.content}
          size="14px"
          weight="400"
          color="#121212"
          styles={{ display: isMobile ? "none" : "flex" }}
        />
      </Flex>
      <Flex
        justify="space-between"
        styles={{ display: isMobile ? "none" : "flex" }}
      >
        <Flex justify="flex-start" align="center" gap="10px">
          <Text
            type="h3"
            text={blog.topic}
            size="16px"
            weight={600}
            color="#00E717"
          />
          <Text
            type="p"
            text={blog.readingTimeInMins + ""}
            size="16px"
            color="#929292"
          />
          <LiaThumbsUpSolid color="#929292" size="22px" />
          <Text type="p" text={blog.likes.length + ""} color="#929292" />
          <LiaThumbsDown color="#929292" size="22px" />
        </Flex>
      </Flex>

      <Flex
        justify="space-between"
        styles={{ display: isMobile ? "flex" : "none" }}
      >
        <Flex justify="flex-start" align="center" gap="10px">
          <Text
            type="h3"
            text="TRAVEL TRIPS"
            size="15px"
            weight={600}
            color="#00E717"
          />
          <Text
            type="p"
            text="6 mins read"
            color="#929292"
            styles={{ display: isMobile ? "none" : "flex" }}
          />
        </Flex>
        <Flex justify="flex-end" align="center" gap="10px">
          <LiaThumbsUpSolid color="#929292" size="19.25px" />
          <Text type="p" text="1.3k" color="#929292" />
          <LiaThumbsDown color="#929292" size="19.25px" />
          <BsBoxArrowUp color="#929292" size="18px" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogCardMini;
