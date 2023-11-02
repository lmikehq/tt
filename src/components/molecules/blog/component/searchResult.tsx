import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaThumbsUpSolid, LiaThumbsDown } from "react-icons/lia";
import { BsBoxArrowUp } from "react-icons/bs";

import AdminPostImg from "../../../../../public/assets/images/blog/adminPost.png";
import User from "../../../../../public/assets/images/blog/user.png";
import BlogImg from "../../../../../public/assets/images/blog/blogImg.png";
import { BlogArticle } from "./blogArticle";
import { BlogArticleMini } from "./blogArticleMini";
import { RelatedTopic } from "./relatedTopic";
import CustomTab from "@/components/atoms/tabs";
import BlogTab from "@/components/atoms/blogTab";

export const SearchResult = () => {
  const tabItems = [
    {
      label: "For You",
      value: 0,
      content: "",
    },
    {
      label: "About Thrillers",
      value: 1,
      content: "",
    },
    {
      label: "Favourites",
      value: 2,
      content: "",
    },

    {
      label: "Visa Application",
      value: 3,
      content: "",
    },

    {
      label: "Flight",
      value: 4,
      content: "",
    },
    {
      label: "Stays",
      value: 5,
      content: "Stays",
    },
  ];

  return (
    <>
      <Flex gap="50px">
        <Flex direction="column" width="65%" gap="1rem">
          <Flex justify="space-between" gap="2rem" margin="0 0 1rem">
            <div style={{ width: "70%" }}>
              <BlogTab tabItems={tabItems} addColor width={true} />
            </div>
          </Flex>
          {/* <Image
            src={AdminPostImg}
            alt=""
            height={374}
            styles={{ borderRadius: "8px" }}
          /> */}
          {/* <Flex justify="space-between">
            <Flex justify="flex-start" gap="10px">
              <Image src={User} width={54} height={54} alt="" />
              <Flex justify="flex-start" direction="column" gap="5px">
                <Text
                  type="h3"
                  text="This Days Moses"
                  weight={500}
                  size="18px"
                  color="#000000"
                />
                <Flex justify="flex-start" gap="10px">
                  <Text
                    type="p"
                    text="Director"
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
          </Flex> */}
          {/* <Flex justify="space-between">
            <Text
              type="h1"
              text="The North American airports that travelers find the most satisfying"
              size="35px"
              weight="600"
            />
            <div style={{ width: "10%" }}></div>
          </Flex> */}

          {/* <Flex justify="space-between">
            <Flex justify="flex-start" align="center" gap="10px">
              <Text
                type="h3"
                text="TRAVEL TRIPS"
                size="15px"
                weight={600}
                color="#00E717"
              />
              <Text type="p" text="6 mins read" color="#929292" />
            </Flex>
            <Flex justify="flex-end" align="center" gap="10px">
              <LiaThumbsUpSolid color="#929292" size="19.25px" />
              <Text type="p" text="1.3k" color="#929292" />
              <LiaThumbsDown color="#929292" size="19.25px" />
              <BsBoxArrowUp color="#929292" size="18px" />
            </Flex>
          </Flex> */}
          
          <BlogArticleMini />
          <br />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
        </Flex>

        <Flex width="40%" direction="column" justify="flex-start" gap="3.5rem">
          <Flex direction="column" gap="3rem">
            <Text
              type="h2"
              text="Similar Blog Post"
              size="20px"
              weight={600}
              styles={{
                justifyContent: "flex-start",
              }}
            />

            <BlogArticle />

            <BlogArticle />
            <BlogArticle />
            <BlogArticle />
            <BlogArticle />
          </Flex>
          <RelatedTopic />
        </Flex>
      </Flex>
    </>
  );
};
