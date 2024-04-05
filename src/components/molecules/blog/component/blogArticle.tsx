import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { BsBoxArrowUp } from "react-icons/bs";
import { BiSolidLike, BiSolidDislike  } from "react-icons/bi";


import Link from "@/components/atoms/link";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { BlogInterface } from "@/lib/types/response-models/blog/index.type";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import User from "../../../../../public/assets/images/blog/user.png";
import Section from "../../section";
import { useEffect, useState } from "react";

import { useUserStore } from "@/lib/store/useStore";
import { useBlogStore } from "@/lib/store/blog.store";
import useLikedByUser from "./use-like-by-user";
import UserAvatar from "@/components/atoms/user-avatar";
import { FaRegComment } from "react-icons/fa";

interface BlogArticleProps {
    blog: BlogInterface;
}
export const BlogArticle = ({ blog }: BlogArticleProps) => {
    const { isMobile } = useScreenResolution();
    const previewUrl = `/blogs/${blog.slug}`;
         const { user, setUser } = useUserStore();
           const { likedByUser, dislikedByUser } = useLikedByUser(blog, user?._id);
    return (
        <>
            <Link href={previewUrl}>
                <Flex direction="column" gap="1.5rem" styles={{ wordBreak: 'break-all' }}>
                    <Image
                        src={blog.blogImage}
                        alt=""
                        height={252}
                        styles={{borderRadius: "8px" }}
                    />
                    <Flex justify="space-between">
                        <Flex justify="flex-start" gap="10px">
                            <Image
                                src={blog.author.picture ?? User}
                                width={54}
                                height={54}
                                alt=""
                            />
                            <Flex
                                justify="flex-start"
                                direction="column"
                                gap="5px"
                            >
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
                                        text={dayjs(blog.createdAt).format(
                                            "MMMM D"
                                        )}
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
                        <Link href={previewUrl}>
                            <Text
                                type="h1"
                                text={blog.title}
                                size="22px"
                                weight="600"
                            />
                            <Text
                                type="p"
                                text={blog.content}
                                size="15px"
                                weight="400"
                                color="#121212"
                            />
                        </Link>
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

                        <Flex justify="flex-end" align="center" gap="10px" border="1px solid red">
                            <BiSolidLike color={likedByUser?"#7BBBD6":"#929292"}  size="19.25px" />
                            <Text type="p" text={`${blog?.likes?.length?blog?.likes?.length:0}`}color="#929292" />
                            <BiSolidDislike color={dislikedByUser?"#7BBBD6":"#929292"} size="19.25px" />
                                 <FaRegComment color="#929292"  size="19.25px"/>
                                     <Text
                                            type="p"
                                            text={`${blog?.comments?.length?blog?.comments?.length:0}`}
                                            color="#929292"
                                            margin={0}
                                        />
                           
                                    
                                      
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
    page?:string;
}

const BlogCardMini: React.FC<BlogCardMiniProps> = ({ blog ,page}) => {
    const { isMobile } = useScreenResolution();
    const previewUrl = `/blogs/${blog.slug}`;
     const { user, setUser } = useUserStore();
     
          const { likedByUser, dislikedByUser } = useLikedByUser(blog, user?._id);


                const [userIp, setUserIp] = useState<string>("");

  const { blogs,setBlogs,likeModal, setLikeModal, setDislikeModal, dislikeModal,feedbackModal, setFeedbackModal,setFeedbackSuccessModal,feedbackSuccessModal,shareModal, setShareModal} = useBlogStore(
        (state) => state);


        
      useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org/?format=json");
        const ipData = await ipResponse.json();
        setUserIp(ipData.ip);
        console.log("ip", ipData.ip)
      } catch (error) {
        console.error(" ip Error fetching user IP", error);
      }
    };
    fetchUserIp();
  }, [blogs]);

  



  


    return (
        <div
           
     style={{
    // border: "1px solid red",
    width: "100%",
    minWidth: "300px",
    height: isMobile ? "400px" : page === "aboutUs" ? "450px" : "430px"
}}
        >
            <Flex
                justify="space-between"
                styles={{
                    display: isMobile ? "flex" : "none",
                    width: "initial",
                }}
            >
                <Flex justify="flex-start" gap="10px" align="center" margin="0 0 15px 0">
                  <UserAvatar
                  
                          img={blog?.author.picture}
                          initial={blog?.author.name}
                      
                         
                        />
                    <Flex justify="flex-start" direction="column" gap="0px">
                        <Text
                            type="h3"
                            text={blog.author.name}
                            weight={500}
                            size={isMobile ? "16px" : "18px"}
                            color="#000000"
                        />
                        <Flex
                            justify="flex-start"
                            gap={isMobile ? "5px" : "10px"}
                        >
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
            <Link href={previewUrl}>
                <Image
                src={blog.blogImage}
                    // src={"/assets/images/blog-dummy-img.svg"}
                    alt="blogImg"
                    // height={252}
                    // width={252}
                    styles={{
                        borderRadius: "8px",
                        maxHeight: "252px",
                        objectFit: "cover",
                    }}
                />
            </Link>
            <Flex
                justify="space-between"
                styles={{ display: isMobile ? "none" : "flex" }}
                align="center"
                margin="0.5rem 0"
            >
                <Flex justify="flex-start" align="center" gap="10px">
                     <UserAvatar
                          img={blog?.author.picture}
                          initial={blog?.author.name}                       
                        />
                    <Flex justify="flex-start" direction="column" gap="0px">
                        <Text
                            type="h3"
                            text={blog.author.name}
                            weight={500}
                            size="15px"
                            color="#000000"
                        />
                        <Flex justify="flex-start" gap="10px">
                            <Text
                                type="p"
                                text={"Editor"}
                                weight={400}
                                size="13px"
                                color="#606060"
                            />
                            <Text
                                type="p"
                                text={dayjs(blog.createdAt).format("MMMM D")}
                                weight={400}
                                size="13px"
                                color="#606060"
                            />
                        </Flex>
                    </Flex>
                </Flex>
                {/* <BsBoxArrowUp color="#929292" size="19.25px"/> */}
            </Flex>

            <Flex direction="column" gap="1rem" margin="0.5rem 0">
                <Link href={previewUrl}>
                    <Text
                        type="h1"
                        text={blog.title}
                        size="20px"
                        weight="600"
                        padding="0 0 .5rem"
                    />
             <Text
    type="p"
    text={
        blog.content
            .replace(/&nbsp;/g, " ")
            .replace(/(<([^>]+)>)/gi, "")
            .substring(0, 100) + "..."
    }
    size="14px"
    weight="400"
    color="#121212"
    styles={{display:isMobile ? "none" : "flex"}}
/>
                </Link>
            </Flex>
            <Flex
                justify="space-between"
                styles={{ display: isMobile ? "none" : "flex" }}
            >
                <Flex justify="space-between" align="center" gap="10px">
                    <Text
                        type="h3"
                        text={blog.topic}
                        size="16px"
                        weight={600}
                        color="#00E717"
                    />

                    <Flex width="fit-content" gap="18px" align="center">
                        <Flex cursor="pointer" gap="5px" align="center">
                            <BiSolidLike  color={likedByUser?"#7BBBD6":"#929292"} size="22px" />
                            <Text
                                type="p"
                                text={blog.likes.length +""}
                                size="16px"
                                color="#929292"
                            />
                            
                        </Flex>
                        <Flex cursor="pointer" >
                            <BiSolidDislike  color={dislikedByUser?"#7BBBD6":"#929292"} size="22px" />
                        </Flex>
                              <Flex cursor="pointer" gap="5px" align="center">
                                 <FaRegComment color="#929292"  size="20px"/>
                                     <Text
                                            type="p"
                                            text={`${blog?.comments?.length?blog?.comments?.length:0}`}
                                            color="#929292"
                                            margin={0}
                                        />
                               
                                    
                                        </Flex>
                    </Flex>
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
                 <Flex width="fit-content" gap="18px" align="center">
                        <Flex cursor="pointer" gap="5px" align="center">
                            <BiSolidLike  color={likedByUser?"#7BBBD6":"#929292"} size="22px" />
                            <Text
                                type="p"
                                text={blog.likes.length +""}
                                size="16px"
                                color="#929292"
                            />
                            
                        </Flex>
                        <Flex cursor="pointer" >
                            <BiSolidDislike  color={dislikedByUser?"#7BBBD6":"#929292"} size="22px" />
                        </Flex>
                              <Flex cursor="pointer" gap="5px" align="center">
                                 <FaRegComment color="#929292"  size="20px"/>
                                     <Text
                                            type="p"
                                            text={`${blog?.comments?.length?blog?.comments?.length:0}`}
                                            color="#929292"
                                            margin={0}
                                        />
                               
                                    
                                        </Flex>
                    </Flex>
            </Flex>
      
        </div>
    );
};

export default BlogCardMini;
