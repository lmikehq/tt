import Image from "@/components/atoms/image";
import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaThumbsUpSolid, LiaThumbsDown } from "react-icons/lia";
import { BsBoxArrowUp } from "react-icons/bs";

import User from "../../../../../public/assets/images/blog/user.png";
import BlogImg from "../../../../../public/assets/images/blog/blogImg.png";
import BlogImgMini from "../../../../../public/assets/images/blog/blogImgMini.png";


export const BlogArticle = () => {
  return (
    <>
      <Flex direction="column" gap="1.5rem">
        <Image
          src={BlogImg}
          alt=""
          height={252}
          // width={442}
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
          <BiDotsHorizontalRounded size="24px" />
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
            <Text
              type="p"
              text="6 mins read"
              size="15px"
              color="#929292"
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
    </>
  );
};


export const BlogMini = () => {
  return (
    <>
      <Flex direction="column" gap="1.2rem">
        <Image
          src={BlogImgMini}
          alt=""
          height={252}
          // width={442}
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
          <BsBoxArrowUp color="#929292" size="19.25px" />
        </Flex>
        <Flex direction="column" gap="1rem">
          <Text
            type="h1"
            text="10 Essential Travel Tips for a Stress-Free Vacation"
            size="20px"
            weight="600"
          />
          <Text
            type="p"
            text="Traveling can be a breeze with the right preparation. From packing also a breeze ...."
            size="14px"
            weight="400"
            color="#121212"
          />
        </Flex>
        <Flex justify="space-between">
          <Flex justify="flex-start" align="center" gap="10px">
            <Text
              type="h3"
              text="TRAVEL TRIPS"
              size="16px"
              weight={600}
              color="#00E717"
            />
            <Text type="p" text="6 mins read" size="16px" color="#929292" />
            <LiaThumbsUpSolid color="#929292" size="22px" />
            <Text type="p" text="1.3k" color="#929292" />
            <LiaThumbsDown color="#929292" size="22px" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
