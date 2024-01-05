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

export const BlogArticle = () => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Link href="/blog/preview">
        <Flex direction="column" gap="1.5rem">
          <Image
            src={BlogImg}
            alt=""
            height={252}
            styles={{ borderRadius: "8px" }}
          />
          <Flex justify="space-between">
            <Flex justify="flex-start" gap="10px">
              <Image src={User} width={54} height={54} alt="" />
              <Flex justify="flex-start" direction="column" gap="5px">
                <Text
                  type="h3"
                  text="Seun Adebayo"
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
                    text="Sept 4"
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
            <Text
              type="h1"
              text="10 Essential Travel Tips for a Stress-Free Vacation"
              size="22px"
              weight="600"
            />
            <Text
              type="p"
              text="Traveling can be a breeze with the right preparation. From packing also a breeze  through right preparation"
              size="15px"
              weight="400"
              color="#121212"
            />
          </Flex>
          <Flex justify="space-between">
            <Flex justify="flex-start" align="center" gap="15px">
              <Text
                type="h3"
                text="TRAVEL TRIPS"
                size="15px"
                weight={600}
                color="#00E717"
              />
              <Text type="p" text="6 mins read" size="15px" color="#929292" styles={{display: isMobile ? "none" : "flex"}} />
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
  imageSrc: string;
  userImageSrc: PropTypes.InferProps<typeof imagePropTypes>;
  authorName: string;
  authorRole: string;
  date: string;
  title: string;
  content: string;
  category: string;
  readTime: string;
  likes: string;
  dislikes: string;
  upvote: string;
}

const BlogCardMini: React.FC<BlogCardMiniProps> = ({
  imageSrc,
  userImageSrc,
  authorName,
  authorRole,
  date,
  title,
  content,
  category,
  readTime,
  likes,
  dislikes,
  upvote,
}) => {
  const { isMobile } = useScreenResolution();

  return (
    <Flex direction="column" gap="1.2rem">
      <Flex
        justify="space-between"
        styles={{ display: isMobile ? "flex" : "none" }}
      >
        <Flex justify="flex-start" gap="10px" align="center">
          <Image
            src={userImageSrc.src}
            width={userImageSrc.width}
            height={userImageSrc.height}
            alt=""
          />
          <Flex justify="flex-start" direction="column" gap="0px">
            <Text
              type="h3"
              text={authorName}
              weight={500}
              size={isMobile ? "16px" : "18px"}
              color="#000000"
            />
            <Flex justify="flex-start" gap={isMobile ? "5px" : "10px"}>
              <Text
                type="p"
                text={authorRole}
                weight={400}
                size={isMobile ? "14px" : "16px"}
                color="#606060"
              />
              <Text
                type="p"
                text={date}
                weight={400}
                size={isMobile ? "14px" : "16px"}
                color="#606060"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Image
        src={imageSrc}
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
              text={authorName}
              weight={500}
              size="18px"
              color="#000000"
            />
            <Flex justify="flex-start" gap="10px">
              <Text
                type="p"
                text={authorRole}
                weight={400}
                size="16px"
                color="#606060"
              />
              <Text
                type="p"
                text={date}
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
        <Text type="h1" text={title} size="20px" weight="600" />
        <Text
          type="p"
          text={content}
          size="14px"
          weight="400"
          color="#121212"
          styles={{display: isMobile ? "none" : "flex"}}
        />
      </Flex>
      <Flex
        justify="space-between"
        styles={{ display: isMobile ? "none" : "flex" }}
      >
        <Flex justify="flex-start" align="center" gap="10px">
          <Text
            type="h3"
            text={category}
            size="16px"
            weight={600}
            color="#00E717"
          />
          <Text type="p" text={readTime} size="16px" color="#929292" />
          <LiaThumbsUpSolid color="#929292" size="22px" />
          <Text type="p" text={likes} color="#929292" />
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

BlogCardMini.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  userImageSrc: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  authorName: PropTypes.string.isRequired,
  authorRole: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
  dislikes: PropTypes.string.isRequired,
  upvote: PropTypes.string.isRequired,
};

export default BlogCardMini;