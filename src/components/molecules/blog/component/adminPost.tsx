import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaThumbsUpSolid, LiaThumbsDown } from "react-icons/lia";
import { BsBoxArrowUp } from "react-icons/bs";

import AdminPostImg from "../../../../../public/assets/images/blog/adminPost.png";
import User from "../../../../../public/assets/images/blog/user.png";
import { BlogArticle } from "./blogArticle";
import { BlogArticleMini } from "./blogArticleMini";
import BlogTab from "@/components/atoms/blogTab";
import Link from "@/components/atoms/link";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFetchBlogs } from "@/lib/hooks/blog/index.hook";
import Section from "../../section";
import { data } from "currency-codes";

export const AdminPost = () => {
    const { isMobile } = useScreenResolution();

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
            label: "Visa Application",
            value: 2,
            content: "",
        },

        {
            label: "Ticket",
            value: 3,
            content: "",
        },
        {
            label: "Stays",
            value: 4,
            content: "",
        },
    ];

    const { data = [] } = useFetchBlogs({});

    return (
        <>
            <Flex
                gap="50px"
                direction={isMobile ? "column" : "row"}
                align="flex-start"
            >
                <Flex
                    direction="column"
                    width={isMobile ? "100%" : "65%"}
                    gap="30px"
                >
                    <BlogTab tabItems={tabItems} addColor={true} width={true} />

                    {/* {!(data.length > 0) ? null : (
                        <Section>
                            <Link
                                href="/blog/preview"
                                style={{
                                    marginTop: "15px",
                                    marginBottom: "50px",
                                }}
                            >
                                <Flex
                                    direction="column"
                                    gap={isMobile ? "10px" : "30px"}
                                >
                                    <Flex
                                        justify="space-between"
                                        styles={{
                                            display: isMobile ? "flex" : "none",
                                        }}
                                    >
                                        <Flex
                                            justify="flex-start"
                                            gap="10px"
                                            align="center"
                                        >
                                            <Image
                                                src={
                                                    data[0].blog.author.picture
                                                }
                                                width={isMobile ? 40 : 54}
                                                height={isMobile ? 40 : 54}
                                                alt="author"
                                            />
                                            <Flex
                                                justify="flex-start"
                                                direction="column"
                                                gap="5px"
                                            >
                                                <Text
                                                    type="h3"
                                                    text="This Days Moses"
                                                    weight={500}
                                                    size={
                                                        isMobile
                                                            ? "16px"
                                                            : "18px"
                                                    }
                                                    color="#000000"
                                                />
                                                <Flex
                                                    justify="flex-start"
                                                    gap={
                                                        isMobile
                                                            ? "5px"
                                                            : "10px"
                                                    }
                                                >
                                                    <Text
                                                        type="p"
                                                        text="Director"
                                                        weight={400}
                                                        size={
                                                            isMobile
                                                                ? "14px"
                                                                : "16px"
                                                        }
                                                        color="#606060"
                                                    />
                                                    <Text
                                                        type="p"
                                                        text="Sept 4"
                                                        weight={400}
                                                        size={
                                                            isMobile
                                                                ? "14px"
                                                                : "16px"
                                                        }
                                                        color="#606060"
                                                    />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Image
                                        src={data[0].blog.blogImage}
                                        alt=""
                                        height={isMobile ? 206 : 374}
                                        styles={{ borderRadius: "8px" }}
                                    />
                                    <Flex
                                        justify="space-between"
                                        styles={{
                                            display: isMobile ? "none" : "flex",
                                        }}
                                    >
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
                                                    text="This Days Moses"
                                                    weight={500}
                                                    size="18px"
                                                    color="#000000"
                                                />
                                                <Flex
                                                    justify="flex-start"
                                                    gap="10px"
                                                >
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
                                    </Flex>

                                    <Flex justify="space-between">
                                        <Text
                                            type="h1"
                                            text="The North American airports that travelers find the most satisfying"
                                            size={isMobile ? "18px" : "35px"}
                                            weight="600"
                                        />
                                        <div style={{ width: "10%" }}></div>
                                    </Flex>

                                    <Flex justify="space-between">
                                        <Flex
                                            justify="flex-start"
                                            align="center"
                                            gap="10px"
                                        >
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
                                                styles={{
                                                    display: isMobile
                                                        ? "none"
                                                        : "flex",
                                                }}
                                            />
                                        </Flex>
                                        <Flex
                                            justify="flex-end"
                                            align="center"
                                            gap="10px"
                                        >
                                            <LiaThumbsUpSolid
                                                color="#929292"
                                                size="19.25px"
                                            />
                                            <Text
                                                type="p"
                                                text="1.3k"
                                                color="#929292"
                                            />
                                            <LiaThumbsDown
                                                color="#929292"
                                                size="19.25px"
                                            />
                                            <BsBoxArrowUp
                                                color="#929292"
                                                size="18px"
                                            />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Link>


                        </Section>
                    )} */}
                </Flex>
                {/* <BlogArticleMini /> */}
                {/* <BlogArticleMini /> */}
                {/* 
                <Flex
                    width={isMobile ? "100%" : "40%"}
                    direction="column"
                    justify="flex-start"
                    gap="3.5rem"
                >
                    <Flex direction="column" gap={isMobile ? "2rem" : "3rem"}>
                        <Text
                            type="h2"
                            text="Recommend Articles"
                            size="28px"
                            weight={600}
                            styles={{
                                justifyContent: "flex-start",
                            }}
                        />

                    </Flex>
                </Flex> */}
                {/* <BlogArticle /> */}
            </Flex>
        </>
    );
};
