"use client";

import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import BlogCardMini from "@/components/molecules/blog/component/blogArticle";
import DislikeModal from "@/components/molecules/blog/component/modals/dislikemodal";
import BlogFeedbackModal from "@/components/molecules/blog/component/modals/feedback-reaction";
import LikeModal from "@/components/molecules/blog/component/modals/likemodal";
import ShareModal from "@/components/molecules/blog/component/modals/sharemodal";
import SuccessModal from "@/components/molecules/blog/component/modals/successmodal";
import useLikedByUser from "@/components/molecules/blog/component/use-like-by-user";
import CountryArticle from "@/components/molecules/countryArticle";
import Spinner from "@/components/molecules/icons/spinner";
import SectionLayout from "@/components/templates/SectionLayout";
import Center from "@/components/templates/center";
import Flex from "@/components/templates/flex";
import apiService from "@/lib/extensions/hook/apiService";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFetchBlogBySlug, useFetchBlogs } from "@/lib/hooks/blog/index.hook";
import { useBlogStore } from "@/lib/store/blog.store";
import { useUserStore } from "@/lib/store/useStore";
import { ttColors } from "@/lib/theme/colors";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsBoxArrowUp } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

import styled from "styled-components";
import UserAvatar from "@/components/atoms/user-avatar";
import BlogCommentSection from "@/components/organisms/blog-comment-section";
import { Grid } from "@/components/templates/grid";

const Box = styled.div`
    width: 886px;

    @media (max-width: 768px) {
        width: 384px;
    }
`;

const Preview = ({ params }: { params: any }) => {
    const { isMobile } = useScreenResolution();
    const {
        mode,
        getBlog,
        blog,
        setBlogs,
        likeModal,
        getAllBlogs,
        setLikeModal,
        setDislikeModal,
        blogs,
        setBlog,
        dislikeModal,
        feedbackModal,
        setFeedbackModal,
        setFeedbackSuccessModal,
        feedbackSuccessModal,
        shareModal,
        setShareModal,
    } = useBlogStore((state) => state);
    const pathname = usePathname();
    const commentSectionRef = useRef<HTMLDivElement>(null);
    const fullUrl = window.location.origin + pathname;
    const { user, setUser } = useUserStore();
    const { likedByUser, dislikedByUser } = useLikedByUser(blog, user?._id);
    const [userIp, setUserIp] = useState<string>("");
    const [openCommentField, setOpenCommentField] = useState(false);

    const scrollToCommentSection = () => {
        if (!user?._id) {
            setLikeModal(true);
            return;
        } else if (commentSectionRef.current) {
            setOpenCommentField(true);
            commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // const { data } = useFetchBlogBySlug(params?.title);
    // const { data: blogs = [] } = useFetchBlogs({});
    useEffect(() => {
        getBlog(params?.title);
        getAllBlogs();
    }, []);

    useEffect(() => {
        const fetchUserIp = async () => {
            try {
                const ipResponse = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const ipData = await ipResponse.json();
                setUserIp(ipData.ip);
            } catch (error) {
                console.error(" ip Error fetching user IP", error);
            }
        };
        fetchUserIp();
    }, [blog]);

    const handleLike = async (blogId: string) => {
        try {
            if (!blog) {
                console.error("Blog is null");
                return;
            }
            if (!user?._id) {
                setLikeModal(true);
                return;
            }
            if (blog.likes.includes(user._id)) {
                // If the user already liked the post, return
                return;
            }

            const updatedBlog = { ...blog };

            // Check if the user already disliked the post
            if (blog.dislikes.includes(user._id)) {
                // Remove user's dislike
                updatedBlog.dislikes = updatedBlog.dislikes.filter(
                    (id) => id !== user._id
                );
            }

            const response = await apiService(`/blog/${blogId}/like`, "POST", {
                ip: user._id,
            });

            if (response && response.data.success) {
                updatedBlog.likes.push(user._id);
                setBlog(updatedBlog);
                setFeedbackModal(true);
            }
        } catch (error) {
            toast.error("Failed to like the post. Please try again.");
        }
    };
    const handleDislike = async (blogId: string) => {
        try {
            if (!blog) {
                console.error("Blog is null");
                return;
            }

            if (!user?._id) {
                setLikeModal(true);
                return;
            }

            const updatedBlog = { ...blog };

            // Check if the user has already disliked the blog
            if (blog.dislikes.includes(user._id)) {
                // User has already disliked the blog, do nothing
                return;
            }

            // Remove like if the user has already liked the blog
            if (blog.likes.includes(user._id)) {
                const updatedLikes = blog.likes.filter(
                    (like) => like !== user._id
                );
                updatedBlog.likes = updatedLikes;
            }

            // Add user to dislikes
            const response = await apiService(
                `/blog/${blogId}/dislike`,
                "POST",
                {
                    ip: user._id,
                }
            );

            if (response && response.data.success) {
                updatedBlog.dislikes.push(user._id);
                setBlog(updatedBlog);
                setFeedbackModal(true);
            }
        } catch (error) {
            toast.error("Failed to dislike the post. Please try again.");
        }
    };

    if (!blog)
        return (
            <Center height="calc(100vh - 70px)">
                <Spinner size="40px" fill={ttColors.primary} />{" "}
            </Center>
        );

    return (
        <SectionLayout style={{ width: isMobile ? "90%" : "59.02%" }}>
            <Flex
                direction="column"
                margin={isMobile ? "80px 0 120px 0" : "111px 0 120px 0"}
            >
                {/* <Text type="h3" text="ENJOY TRAVEL EXPERIENCE IN FORM OF A STORY" size={isMobile?45:64} weight={700} textAlign="center" margin={0}/> */}
                <Image
                    // src={blog?.blogImage}
                    src={blog?.blogImage}
                    alt="blogImage"
                    styles={{
                        borderRadius: "8px",
                        maxWidth: "100%",
                        height: "auto",
                        margin: "0px 0 64px 0",
                    }}
                />

                <Text
                    type="h1"
                    text={blog?.title}
                    size={isMobile ? "20px" : "40px"}
                    weight="700"
                />

                <Flex justify="flex-start" direction="column" gap="10px">
                    <Flex direction="row" gap="10px" align="center">
                        <UserAvatar
                            img={blog?.author.picture}
                            initial={blog?.author.name}
                        />
                        <Flex direction="column">
                            <Text
                                type="h3"
                                text={blog?.author.name}
                                weight={600}
                                size={isMobile ? "18px" : "20px"}
                                color="#000000"
                            />

                            <Flex>
                                <Flex
                                    justify="flex-start"
                                    align="center"
                                    gap="10px"
                                >
                                    {" "}
                                    <Text
                                        type="p"
                                        text="Thrillers Travels Editor"
                                        weight={400}
                                        size="16px"
                                        color="#929292"
                                    />
                                    <GoDotFill color="#929292" size="6px" />
                                    <Text
                                        type="p"
                                        text={`${Math.ceil(
                                            blog?.readingTimeInMins
                                        )} min${
                                            Math.ceil(
                                                blog?.readingTimeInMins
                                            ) == 1
                                                ? ""
                                                : "s"
                                        }`}
                                        weight={400}
                                        size="16px"
                                        color="#929292"
                                        styles={{
                                            display: isMobile ? "none" : "flex",
                                        }}
                                    />
                                    <GoDotFill
                                        color="#929292"
                                        size="6px"
                                        style={{
                                            display: isMobile ? "none" : "flex",
                                        }}
                                    />
                                    <Text
                                        type="p"
                                        text={dayjs(blog.createdAt).format(
                                            "MMMM D"
                                        )}
                                        weight={400}
                                        size="16px"
                                        color="#929292"
                                    />
                                </Flex>
                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    gap="36px"
                                    styles={{
                                        display: isMobile ? "none" : "flex",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <BiSolidLike
                                            cursor="pointer"
                                            color={
                                                likedByUser
                                                    ? "#7BBBD6"
                                                    : "#929292"
                                            }
                                            size="24px"
                                            onClick={() => handleLike(blog._id)}
                                        />
                                        <Text
                                            type="p"
                                            text={`${blog?.likes.length}`}
                                            color="#929292"
                                            margin={0}
                                        />
                                    </div>

                                    <BiSolidDislike
                                        cursor="pointer"
                                        color={
                                            dislikedByUser
                                                ? "#7BBBD6"
                                                : "#929292"
                                        }
                                        size="24px"
                                        onClick={() => handleDislike(blog._id)}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                        onClick={scrollToCommentSection}
                                    >
                                        {" "}
                                        <FaRegComment
                                            color="#929292"
                                            size="20px"
                                        />
                                        <Text
                                            type="p"
                                            text={`${
                                                blog?.comments?.length
                                                    ? blog?.comments?.length
                                                    : 0
                                            }`}
                                            color="#929292"
                                            margin={0}
                                        />
                                    </div>

                                    <BsBoxArrowUp
                                        color="#929292"
                                        size="20px"
                                        onClick={() => setShareModal(true)}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex
                        gap="5px"
                        align="center"
                        styles={{
                            display: isMobile ? "flex" : "none",
                        }}
                    >
                        <Text
                            type="p"
                            text="5mins read"
                            weight={400}
                            size="16px"
                            color="#929292"
                        />
                        <GoDotFill color="#929292" size="6px" />
                        <Text
                            type="h3"
                            text="Entertainment"
                            size="18px"
                            weight={400}
                            color="#0D00A0"
                        />
                    </Flex>

                    <Flex
                        justify="flex-start"
                        align="flex-start"
                        gap="36px"
                        margin="0 0 30px 0"
                        styles={{ display: isMobile ? "flex" : "none" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <BiSolidLike
                                cursor="pointer"
                                color={likedByUser ? "#7BBBD6" : "#929292"}
                                size="24px"
                                onClick={() => handleLike(blog._id)}
                            />
                            <Text
                                type="p"
                                text={`${blog?.likes.length}`}
                                color="#929292"
                                margin={0}
                            />
                        </div>
                        <BiSolidDislike
                            cursor="pointer"
                            color={dislikedByUser ? "#7BBBD6" : "#929292"}
                            size="24px"
                            onClick={() => handleDislike(blog._id)}
                        />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                            onClick={scrollToCommentSection}
                        >
                            {" "}
                            <FaRegComment color="#929292" size="20px" />
                            <Text
                                type="p"
                                text={`${
                                    blog?.comments?.length
                                        ? blog?.comments?.length
                                        : 0
                                }`}
                                color="#929292"
                                margin={0}
                            />
                        </div>
                        <BsBoxArrowUp
                            color="#929292"
                            size="20px"
                            onClick={() => setShareModal(true)}
                        />
                    </Flex>

                    <Text
                        type="h3"
                        text="Entertainment"
                        size="18px"
                        styles={{ display: isMobile ? "none" : "flex" }}
                        weight={400}
                        color="#0D00A0"
                    />
                </Flex>
                {/* <Flex justify="space-between" margin="0 0 40px 0">
                    <Flex justify="flex-start" align="center" gap="10px">
                        <UserAvatar
                          img={blog?.author.picture}
                          initial={blog?.author.name}
                      
                         
                        />
                        <Flex
                            justify="flex-start"
                            direction="column"
                            gap="10px"
                        >
                            <Flex
                                justify="flex-start"
                                direction="column"
                                gap="5px"
                            >
                                <Text
                                    type="h3"
                                    text={blog?.author.name}
                                    weight={600}
                                    size={isMobile ? "18px" : "20px"}
                                    color="#000000"
                                />
                                <Flex
                                    justify="flex-start"
                                    align="center"
                                    gap="10px"
                                >
                                    <Flex
                                        justify="flex-start"
                                        align="center"
                                        gap="10px"
                                    >
                                        <Text
                                            type="p"
                                            text="Thrillers Travels Editor"
                                            weight={400}
                                            size="16px"
                                            color="#929292"
                                        />
                                        <GoDotFill color="#929292" size="6px" />
                                        <Text
                                            type="p"
                                            text={`${Math.ceil(
                                                blog?.readingTimeInMins
                                            )} min${
                                                Math.ceil(
                                                    blog?.readingTimeInMins
                                                ) == 1
                                                    ? ""
                                                    : "s"
                                            }`}
                                            weight={400}
                                            size="16px"
                                            color="#929292"
                                            styles={{
                                                display: isMobile
                                                    ? "none"
                                                    : "flex",
                                            }}
                                        />
                                        <GoDotFill
                                            color="#929292"
                                            size="6px"
                                            style={{
                                                display: isMobile
                                                    ? "none"
                                                    : "flex",
                                            }}
                                        />
                                        <Text
                                            type="p"
                                            text={dayjs(blog.createdAt).format(
                                                "MMMM D"
                                            )}
                                            weight={400}
                                            size="16px"
                                            color="#929292"
                                        />
                                    </Flex>

                                    <Flex
                                        justify="flex-end"
                                        align="center"
                                        gap="36px"
                                        styles={{
                                            display: isMobile ? "none" : "flex",
                                        }}
                                       
                                    >
                                        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
  <BiSolidLike cursor="pointer"
                                            color={likedByUser?"#7BBBD6":"#929292"}
                                            size="24px"
                
                                             onClick={()=>handleLike(blog._id)}
                                        />
                                        <Text
                                            type="p"
                                            text={`${blog?.likes.length}`}
                                            color="#929292"
                                            margin={0}
                                        />
                                        </div>
                                      
                                        <BiSolidDislike  cursor="pointer"
                                             color={dislikedByUser?"#7BBBD6":"#929292"}
                                            size="24px"
                                              onClick={()=>handleDislike(blog._id)}
                                        />
                                        <div style={{display:"flex", alignItems:"center", gap:"10px"}} onClick={scrollToCommentSection}>   <FaRegComment color="#929292"  size="20px"/>
                                         <Text
                                            type="p"
                                            text={`${blog?.comments?.length?blog?.comments?.length:0}`}
                                            color="#929292"
                                            margin={0}
                                        /></div>
                                     
                                        <BsBoxArrowUp
                                            color="#929292"
                                            size="20px"
                                            onClick={()=>setShareModal(true)}
                                          
                                        />
                                    </Flex>
                                </Flex>
                                <Text
                                    type="h3"
                                    text={blog?.topic}
                                    size="18px"
                                    weight={400}
                                    color="#0D00A0"
                                    styles={{
                                        display: isMobile ? "none" : "flex",
                                    }}
                                />
                                <Flex
                                    gap="5px"
                                    align="center"
                                    styles={{
                                        display: isMobile ? "flex" : "none",
                                    }}
                                >
                                    <Text
                                        type="p"
                                        text="5mins read"
                                        weight={400}
                                        size="16px"
                                        color="#929292"
                                    />
                                    <GoDotFill color="#929292" size="6px" />
                                    <Text
                                        type="h3"
                                        text="Entertainment"
                                        size="18px"
                                        weight={400}
                                        color="#0D00A0"
                                    />
                                </Flex>
                            </Flex>
                            <Flex
                                justify="flex-start"
                                align="flex-start"
                                gap="36px"
                                margin="0 0 30px 0"
                                styles={{ display: isMobile ? "flex" : "none" }}
                            >
                               <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
  <BiSolidLike cursor="pointer"
                                            color={likedByUser?"#7BBBD6":"#929292"}
                                            size="24px"
                
                                             onClick={()=>handleLike(blog._id)}
                                        />
                                        <Text
                                            type="p"
                                            text={`${blog?.likes.length}`}
                                            color="#929292"
                                            margin={0}
                                        />
                                        </div>
                                <BiSolidDislike   cursor="pointer"  color={dislikedByUser?"#7BBBD6":"#929292"} size="24px"     onClick={()=>handleDislike(blog._id)}/>
                               <div style={{display:"flex", alignItems:"center", gap:"10px"}} onClick={scrollToCommentSection}>   <FaRegComment color="#929292"  size="20px"/>
                                         <Text
                                            type="p"
                                            text={`${blog?.comments?.length?blog?.comments?.length:0}`}
                                            color="#929292"
                                            margin={0}
                                        /></div>
                                <BsBoxArrowUp color="#929292" size="20px" onClick={()=>setShareModal(true)} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex> */}

                <CountryArticle article={{ body: blog?.content }} />
                <div ref={commentSectionRef}>
                    <BlogCommentSection
                        blog={blog}
                        inputfield={openCommentField}
                    />
                </div>

                <Text
                    type="h2"
                    text="More Blog Posts"
                    size="24px"
                    weight={600}
                    margin={"0 0 15px 0"}
                />
                {/* <Flex gap={isMobile ? "30" : "28px"} wrap="wrap"> */}
                <Grid
                    columns={isMobile ? "1" : "2"}
                    gap={isMobile ? "2.5rem" : ""}
                >
                    {blogs.slice(0, 4).map((blog, index) => (
                        <BlogCardMini key={index} blog={blog} />
                    ))}{" "}
                </Grid>

                {/* <Flex
                        justify="space-between"
                        direction={isMobile ? "column" : "row"}
                        gap={isMobile ? "30px" : "24px"}
                    >
                        <Flex direction="column" gap="1.2rem">
                            <Image
                                src={ReviewOne}
                                alt=""
                                height={isMobile ? 287 : 398}
                                styles={{
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
                            <Flex justify="space-between" align="center">
                                <Flex justify="flex-start" gap="10px">
                                    <Image
                                        src={User}
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
                                            text="Seun Adebayo"
                                            weight={500}
                                            size="18px"
                                            color="#000000"
                                        />

                                        <Text
                                            type="p"
                                            text="Admin Thrillers"
                                            weight={400}
                                            size="16px"
                                            color="#606060"
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex direction="column" gap="1rem">
                                <Text
                                    type="h1"
                                    text="Adventures in the Amazon Rainforest: Exploring Nature's Wonderland"
                                    size={isMobile ? "20px" : "26px"}
                                    weight="600"
                                />
                                <Text
                                    type="p"
                                    text="Delve into the heart of the Amazon rainforest, where all living biodiversity thrives. Trek through lush jungles, spot large exotic wildlife, and connect with indigenous cultures in this ultimate ..."
                                    size={isMobile ? "16px" : "18px"}
                                    weight="400"
                                    color="#121212"
                                />
                            </Flex>

                            <Flex
                                justify="flex-start"
                                align="center"
                                gap="10px"
                            >
                                <Flex
                                    justify="flex-start"
                                    align="center"
                                    gap="10px"
                                >
                                    <Text
                                        type="p"
                                        text="Sept 4"
                                        size="16px"
                                        weight={400}
                                        color="#606060"
                                    />
                                    <GoDotFill size="16px" color="#D9D9D9" />
                                    <Text
                                        type="p"
                                        text="6 mins read"
                                        size="16px"
                                        color="#606060"
                                    />
                                </Flex>
                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    gap="10px"
                                >
                                    <BiSolidLike
                                        color="#929292"
                                        size="24px"
                                    />
                                    <Text
                                        type="p"
                                        text={`${data?.likes.length}`}
                                        color="#929292"
                                        cursor="pointer"
                                    />
                                    <BiSolidDislike 
                                        color="#929292"
                                        size="24px"
                                    />
                                    <BsBoxArrowUp color="#929292" size="20px" />
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex direction="column" gap="1.2rem">
                            <Image
                                src={ReviewTwo}
                                alt=""
                                height={isMobile ? 287 : 398}
                                styles={{
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
                            <Flex justify="space-between" align="center">
                                <Flex justify="flex-start" gap="10px">
                                    <Image
                                        src={User}
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
                                            text="Seun Adebayo"
                                            weight={500}
                                            size="18px"
                                            color="#000000"
                                        />

                                        <Text
                                            type="p"
                                            text="Admin Thrillers"
                                            weight={400}
                                            size="16px"
                                            color="#606060"
                                        />
                                    </Flex>
                                </Flex>
                                <BiDotsHorizontalRounded
                                    color="#040404"
                                    size="28px"
                                />
                            </Flex>
                            <Flex direction="column" gap="1rem">
                                <Text
                                    type="h1"
                                    text="Chasing Waterfalls: A Bucket List of World's Most Spectacular Falls"
                                    size={isMobile ? "20px" : "26px"}
                                    weight="600"
                                />
                                <Text
                                    type="p"
                                    text="Get inspired by nature's beauty as we take you on a journey to witness some of the world's most stunning waterfalls. From Angel Falls in Venezuela to Victoria Falls in Africa, these ..."
                                    size={isMobile ? "16px" : "18px"}
                                    weight="400"
                                    color="#121212"
                                />
                            </Flex>
                            <Flex
                                justify="flex-start"
                                align="center"
                                gap="10px"
                            >
                                <Flex
                                    justify="flex-start"
                                    align="center"
                                    gap="10px"
                                >
                                    <Text
                                        type="p"
                                        text="Sept 4"
                                        size="16px"
                                        weight={400}
                                        color="#606060"
                                    />
                                    <GoDotFill size="16px" color="#D9D9D9" />
                                    <Text
                                        type="p"
                                        text="6 mins read"
                                        size="16px"
                                        color="#606060"
                                    />
                                </Flex>
                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    gap="10px"
                                >
                                    <BiSolidLike
                                        color="#929292"
                                        size="24px"
                                    />
                                    <Text
                                        type="p"
                                        text={`${data?.likes.length}`}
                                        color="#929292"
                                        cursor="pointer"
                                    />
                                    <BiSolidDislike 
                                        color="#929292"
                                        size="24px"
                                    />
                                    <BsBoxArrowUp color="#929292" size="20px" />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex
                        justify="space-between"
                        direction={isMobile ? "column" : "row"}
                        gap={isMobile ? "30px" : "24px"}
                    >
                        <Flex direction="column" gap="1.2rem">
                            <Image
                                src={ReviewOne}
                                alt=""
                                height={isMobile ? 287 : 398}
                                styles={{
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
                            <Flex justify="space-between" align="center">
                                <Flex justify="flex-start" gap="10px">
                                    <Image
                                        src={User}
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
                                            text="Seun Adebayo"
                                            weight={500}
                                            size="18px"
                                            color="#000000"
                                        />

                                        <Text
                                            type="p"
                                            text="Admin Thrillers"
                                            weight={400}
                                            size="16px"
                                            color="#606060"
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex direction="column" gap="1rem">
                                <Text
                                    type="h1"
                                    text="Adventures in the Amazon Rainforest: Exploring Nature's Wonderland"
                                    size="26px"
                                    weight="600"
                                />
                                <Text
                                    type="p"
                                    text="Delve into the heart of the Amazon rainforest, where all living biodiversity thrives. Trek through lush jungles, spot large exotic wildlife, and connect with indigenous cultures in this ultimate ..."
                                    size="18px"
                                    weight="400"
                                    color="#121212"
                                />
                            </Flex>

                            <Flex
                                justify="flex-start"
                                align="center"
                                gap="10px"
                            >
                                <Flex
                                    justify="flex-start"
                                    align="center"
                                    gap="10px"
                                >
                                    <Text
                                        type="p"
                                        text="Sept 4"
                                        size="16px"
                                        weight={400}
                                        color="#606060"
                                    />
                                    <GoDotFill size="16px" color="#D9D9D9" />
                                    <Text
                                        type="p"
                                        text="6 mins read"
                                        size="16px"
                                        color="#606060"
                                    />
                                </Flex>
                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    gap="10px"
                                >
                                    <BiSolidLike
                                        color="#929292"
                                        size="24px"
                                    />
                                    <Text
                                        type="p"
                                        text={`${data?.likes.length}`}
                                        color="#929292"
                                        cursor="pointer"
                                    />
                                    <BiSolidDislike 
                                        color="#929292"
                                        size="24px"
                                    />
                                    <BsBoxArrowUp color="#929292" size="20px" />
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex direction="column" gap="1.2rem">
                            <Image
                                src={ReviewTwo}
                                alt=""
                                height={isMobile ? 287 : 398}
                                styles={{
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
                            <Flex justify="space-between" align="center">
                                <Flex justify="flex-start" gap="10px">
                                    <Image
                                        src={User}
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
                                            text="Seun Adebayo"
                                            weight={500}
                                            size="18px"
                                            color="#000000"
                                        />

                                        <Text
                                            type="p"
                                            text="Admin Thrillers"
                                            weight={400}
                                            size="16px"
                                            color="#606060"
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex direction="column" gap="1rem">
                                <Text
                                    type="h1"
                                    text="Chasing Waterfalls: A Bucket List of World's Most Spectacular Falls"
                                    size={isMobile ? "20px" : "26px"}
                                    weight="600"
                                />
                                <Text
                                    type="p"
                                    text="Get inspired by nature's beauty as we take you on a journey to witness some of the world's most stunning waterfalls. From Angel Falls in Venezuela to Victoria Falls in Africa, these ..."
                                    size={isMobile ? "16px" : "18px"}
                                    weight="400"
                                    color="#121212"
                                />
                            </Flex>
                            <Flex
                                justify="flex-start"
                                align="center"
                                gap="10px"
                            >
                                <Flex
                                    justify="flex-start"
                                    align="center"
                                    gap="10px"
                                >
                                    <Text
                                        type="p"
                                        text="Sept 4"
                                        size="16px"
                                        weight={400}
                                        color="#606060"
                                    />
                                    <GoDotFill size="16px" color="#D9D9D9" />
                                    <Text
                                        type="p"
                                        text="6 mins read"
                                        size="16px"
                                        color="#606060"
                                    />
                                </Flex>
                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    gap="10px"
                                >
                                    <BiSolidLike
                                        color="#929292"
                                        size="24px"
                                    />
                                    <Text
                                        type="p"
                                        text={`${data?.likes.length}`}
                                        color="#929292"
                                        cursor="pointer"
                                    />
                                    <BiSolidDislike 
                                        color="#929292"
                                        size="24px"
                                    />
                                    <BsBoxArrowUp color="#929292" size="20px" />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex> */}
                {/* </Flex> */}
            </Flex>
            <LikeModal open={likeModal} onClose={() => setLikeModal(false)} />
            {/* <DislikeModal open={dislikeModal} onClose={()=>setDislikeModal(false)}/> */}

            <BlogFeedbackModal
                open={feedbackModal}
                blog={blog}
                onClose={() => setFeedbackModal(false)}
            />
            <SuccessModal
                open={feedbackSuccessModal}
                onClose={() => setFeedbackSuccessModal(false)}
            />
            <ShareModal
                open={shareModal}
                onClose={() => setShareModal(false)}
                url={fullUrl}
                title={blog.title}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blog.customJSONLDCode),
                }}
            />
        </SectionLayout>
    );
};

export default Preview;
