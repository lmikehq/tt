import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import React, { useEffect, useState } from "react";
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
import apiService from "@lib/extensions/hook/apiService";
import { toast } from "react-hot-toast";
import { RWebShare } from "react-web-share";

interface Blog {
  _id: string;
  author: string;
  blogImage: string;
  readingTimeInMins: number;
  topic: string;
  tags: string[];
  likes: string[];
  dislikes: string[];
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

//DATE FORMAT
function formatDate(dateString: string) {
  const options = { month: "short", day: "numeric" } as const;
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(dateString)
  );
  return formattedDate;
}

export const TruncatedBlogContent: React.FC<{ blog: { content: string } }> = ({
  blog,
}) => (
  <div
    style={{
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      fontSize: "16px",
      wordWrap: "break-word",
      WebkitLineClamp: 2,
    }}
    dangerouslySetInnerHTML={{
      __html:
        blog.content.length > 200
          ? blog.content.substring(0, 200) + "..."
          : blog.content,
    }}
  />
);

function BlogStories() {
  const { isMobile } = useScreenResolution();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // FETCH BLOG POST
  const fetchBlogList = async () => {
    try {
      const response = await apiService("/blog", "GET");
      if (response?.success) {
        setBlogs(response.data);
      } else {
        console.error("Failed to fetch blog list");
      }
    } catch (error) {
      console.error("Error fetching blog list", error);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  // LIKE
  const handleLike = async (blogId: string) => {
    try {
      await apiService(`/blog/${blogId}/like`, "POST", {
        ip: "fjfjfjfjfjfjfj",
      });
      fetchBlogList();
    } catch (error) {
      console.error("Error liking the post:", error);
      toast.error("Failed to like the post. Please try again.");
    }
  };

  // DISLIKE
  const handleDislike = async (blogId: string) => {
    try {
      await apiService(`/blog/${blogId}/dislike`, "POST", {
        ip: "fjfjfjfjfjfjfj",
      });
      fetchBlogList();
    } catch (error) {
      console.error("Error disliking the post:", error);
      toast.error("Failed to dislike the post. Please try again.");
    }
  };

  console.log("BLOG LIST:", blogs);

  //PAGE URL
  const pageURL = process.env.NEXT_PUBLIC_SITE_URL;

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
                <SliderImgBox className="stay_landing_trending">
                  <Link href="">
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                      src={blog.blogImage}
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
                      src="/assets/images/stays/admin.png"
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
                          text={formatDate(blog.createdAt)}
                        ></Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <RWebShare
                    data={{
                      text: `Check out this cool ${blog.title}`,
                      url: `${pageURL}/blog/${blog._id}`,
                      title: blog.title,
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <IosShareIcon
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "var(--text-gray-color)",
                      }}
                    />
                  </RWebShare>
                </FlexBox>
                <Flex styles={{ marginTop: "10px" }}>
                  <Link href="" style={{ width: "fit-content" }}>
                    <TruncateMarkup lines={1}>
                      <h2>{blog.title}</h2>
                    </TruncateMarkup>
                  </Link>
                </Flex>
                <Flex margin="10px 0px">
                  <TruncatedBlogContent blog={blog} />
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
                      text={`${blog.readingTimeInMins} read`}
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
                      <BiLike
                        onClick={() => handleLike(blog._id)}
                        style={{ cursor: "pointer", fontSize: "18px" }}
                      />
                      <Span>{blog.likes.length}</Span>
                    </Flex>
                    <Flex gap="3px" align="center">
                      <BiDislike
                        onClick={() => handleDislike(blog._id)}
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
