import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import React from "react";
import {
  FlexBox,
  SlideCard,
  SlideContent,
  SlideList,
  SliderImgBox,
  SliderWidth,
  Span,
} from "./components/styles";
import Link from "@/components/atoms/link";
import TruncateMarkup from "react-truncate-markup";
import { ttColors } from "@/lib/theme/colors";
import IosShareIcon from "@mui/icons-material/IosShare";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import Button from "@/components/atoms/button";

interface Blog {
  title: string;
  image: string;
  author: string;
  authorImg: string;
  description: string;
  read_time: string;
  likes: number;
  disLikes: number;
}

const blogs: Blog[] = [
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    author: "Seun Adebayo",
    authorImg: "/assets/images/stays/admin.png",
    image: "/assets/images/stays/blog1.png",
    description:
      "Traveling can be a breeze with the right preparation. From packing also a breeze From packing also a breeze",
    read_time: "6 mins",
    likes: 150,
    disLikes: 10,
  },
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    author: "Seun Adebayo",
    authorImg: "/assets/images/stays/admin.png",
    image: "/assets/images/stays/blog1.png",
    description:
      "Traveling can be a breeze with the right preparation. From packing also a breeze",
    read_time: "6 mins",
    likes: 150,
    disLikes: 10,
  },
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    author: "Seun Adebayo",
    authorImg: "/assets/images/stays/admin.png",
    image: "/assets/images/stays/blog1.png",
    description:
      "Traveling can be a breeze with the right preparation. From packing also a breeze",
    read_time: "6 mins",
    likes: 150,
    disLikes: 10,
  },
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    author: "Seun Adebayo",
    authorImg: "/assets/images/stays/admin.png",
    image: "/assets/images/stays/blog1.png",
    description:
      "Traveling can be a breeze with the right preparation. From packing also a breeze",
    read_time: "6 mins",
    likes: 150,
    disLikes: 10,
  },
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    author: "Seun Adebayo",
    authorImg: "/assets/images/stays/admin.png",
    image: "/assets/images/stays/blog1.png",
    description:
      "Traveling can be a breeze with the right preparation. From packing also a breeze",
    read_time: "6 mins",
    likes: 150,
    disLikes: 10,
  },
  {
    title: "10 Essential Travel Tips for a Stress-Free Vacation",
    author: "Seun Adebayo",
    authorImg: "/assets/images/stays/admin.png",
    image: "/assets/images/stays/blog1.png",
    description:
      "Traveling can be a breeze with the right preparation. From packing also a breeze",
    read_time: "6 mins",
    likes: 150,
    disLikes: 10,
  },
];
function BlogStories() {
  const { isMobile } = useScreenResolution();

  return (
    <div>
      <Flex direction="column">
        <Flex
          direction="column"
          gap=".65rem"
          wrap={isMobile ? "unset" : "wrap"}
          styles={{ marginBottom: "20px" }}
        >
          <Text
            type="h1"
            text="Blog Stories"
            font="Montserrat"
            weight={700}
            size={36}
          />
          <Text
            type="p"
            text="Find very interesting stories rating to Thrillers and Travel in general."
            size={18}
            whiteSpace={isMobile ? "unset" : "nowrap"}
          />
        </Flex>
      </Flex>
      <SlideContent>
        <SliderWidth className="stay_landing_cards">
          {blogs?.slice(0, 3).map((blog, index) => (
            <SlideCard key={index}>
              <SlideList>
                <SliderImgBox className="blog_img_height">
                  <Link href="">
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                      src={blog.image}
                      alt={blog.title}
                    />
                  </Link>
                </SliderImgBox>
                <FlexBox className="stay_blog_admin">
                  <Flex align="center" gap="10px">
                    <img
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                      src={blog.authorImg}
                      alt={blog.author}
                    />
                    <Flex direction="column" gap="5px">
                      <Text
                        whiteSpace="nowrap"
                        type="h4"
                        weight={500}
                        text={blog.author}
                      ></Text>
                      <Flex gap="10px">
                        <Text
                          whiteSpace="nowrap"
                          type="p"
                          size={14}
                          text="Admin Thrillers"
                        ></Text>
                        <Text
                          size={14}
                          whiteSpace="nowrap"
                          type="p"
                          text="Sept 4"
                        ></Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <IosShareIcon
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "var(--text-gray-color)",
                    }}
                  />
                </FlexBox>
                <Flex styles={{ marginTop: "10px" }}>
                  <Link href="" style={{ width: "fit-content" }}>
                    <Text
                      type="h2"
                      text={blog.title}
                      weight={"bold"}
                      styles={{
                        fontSize: "22px",
                      }}
                    ></Text>
                  </Link>
                </Flex>
                <Flex margin="10px 0px">
                  <TruncateMarkup lines={2}>
                    <p style={{ fontSize: "16px" }}>{blog.description}</p>
                  </TruncateMarkup>{" "}
                </Flex>
                <Flex justify="space-between">
                  <Flex gap="5px" align="center">
                    <Text
                      type="h4"
                      weight={600}
                      color={ttColors.successGreen}
                      styles={{ textTransform: "uppercase" }}
                      text="TRAVEL TRIPS"
                    ></Text>
                    <Text
                      type="p"
                      color="var(--text-gray-color)"
                      size={14}
                      text={`${blog.read_time} read`}
                    ></Text>
                  </Flex>
                  <Span
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Flex gap="3px" align="center">
                      <BiLike style={{ cursor: "pointer", fontSize: "18px" }} />
                      <Span>{blog.likes}</Span>
                    </Flex>
                    <Flex gap="3px" align="center">
                      <BiDislike
                        style={{ cursor: "pointer", fontSize: "18px" }}
                      />
                    </Flex>
                  </Span>
                </Flex>
              </SlideList>
            </SlideCard>
          ))}
        </SliderWidth>
        <Flex
          width="100%"
          justify="center"
          align="center"
          styles={{ marginTop: "20px" }}
        >
          <Link href="">
            <Span
              style={{
                padding: "8px 30px",
                border: "1px solid var(--secondary-color)",
                borderRadius: "6px",
              }}
            >
              <Text weight={600} type="p" text="View More"></Text>
            </Span>{" "}
          </Link>
        </Flex>
      </SlideContent>
    </div>
  );
}

export default BlogStories;
