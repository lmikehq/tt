import BlogTab from "@/components/atoms/blogTab";
import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFetchBlogs } from "@/lib/hooks/blog/index.hook";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import styled from "styled-components";
import Section from "../../section";
import BlogCardMini from "./blogArticle";
const Box = styled.div`
    width: 886px;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

const SearchArea = styled.div`
    position: relative;
    width: 652px;
    border: 1px solid #b6b6b6;
    border-radius: 8px;
    background-color: #ffffff;
    // top: 30px;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 23px;
    margin: 1rem 0rem 2rem;

    &:focus-within {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    @media (max-width: 900px) {
        width: 384px;
    }
`;

const SearchResultsContainer = styled.div`
    position: absolute;
    top: calc(100% + 0px);
    left: -1px;
    width: 652px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #b6b6b6;
    border-radius: 8px;
    border-top: none;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    z-index: 999;
    padding: 0px 23px;

    @media (min-width: 900px) {
        width: 100%;
    }
`;

const SearchResultItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    // border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
`;

export const BlogHeroSection = () => {
    const { isMobile } = useScreenResolution();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [searchResultText, setSearchResultText] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isSearchResultsVisible, setSearchResultsVisible] = useState(false);

    // const handleToggleSearchResults = () => {
    //   setSearchResultsVisible(!isSearchResultsVisible);
    // };
    const { data = [] } = useFetchBlogs({});

    const tabItems = [
        {
            label: "For You",
            value: 0,
            content: "",
        },

        {
            label: "Events",
            value: 1,
            content: "",
        },

        // {
        //     label: "Visa Application",
        //     value: 2,
        //     content: "",
        // },

        // {
        //     label: "Flight Ticket",
        //     value: 3,
        //     content: "",
        // },
        // {
        //     label: "Stays",
        //     value: 4,
        //     content: "",
        // },
        // {
        //     label: "Others",
        //     value: 4,
        //     content: "",
        // },
    ];

    const [activeTab, setActiveTab] = useState(0);

    const handleSearch = () => {
        setSearchTriggered(true);
        setSearchResultText(
            searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
        );

        if (searchTerm && !recentSearches.includes(searchTerm)) {
            setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
        }
    };

    const handleRecentSearch = (term: string) => {
        setSearchTerm(term);
        handleSearch();
        setSearchResultsVisible(false);
    };

    const handleClearRecentSearch = (index: number) => {
        const updatedSearches = [...recentSearches];
        updatedSearches.splice(index, 1);
        setRecentSearches(updatedSearches);

        setSearchResultsVisible(updatedSearches.length > 0);
    };

    const handleInputFocus = () => {
        // setSearchResultsVisible(true);
    };

    const handleInputBlur = () => {
        // setSearchResultsVisible(false);
    };

    // const blogs = [
    //     {
    //         _id: "01",
    //         blogImage:
    //             "https://res.cloudinary.com/thrillers-travels/image/upload/v1704888923/ADEBISI1704888727685-files/yvbtno7eqejklzropdxk.webp",
    //         readingTimeInMins: 6,
    //         topic: "Travels",
    //         tags: ["Travel", "Tips", "Vacation"],
    //         likes: ["01", "02", "03", "04", "05"],
    //         dislikes: ["01", "02", "03", "04", "05"],
    //         title: "10 Essential Travel Tips for a Stress-Free Vacation",
    //         content:
    //             "Traveling can be a breeze with the right preparation. From packing also a breeze ....",
    //         createdAt: "2021-09-09T00:00:00.000Z",
    //         updatedAt: "2021-09-09T00:00:00.000Z",
    //         author: {
    //             name: "Seun Adebayo",
    //             picture: User.src,
    //         },
    //     },
    //     {
    //         _id: "02",
    //         blogImage:
    //             "https://res.cloudinary.com/thrillers-travels/image/upload/v1704888923/ADEBISI1704888727685-files/yvbtno7eqejklzropdxk.webp",
    //         readingTimeInMins: 6,
    //         topic: "Travels",
    //         tags: ["Travel", "Tips", "Vacation"],
    //         likes: ["01", "02", "03", "04", "05"],
    //         dislikes: ["01", "02", "03", "04", "05"],
    //         title: "10 Essential Travel Tips for a Stress-Free Vacation",
    //         content:
    //             "Traveling can be a breeze with the right preparation. From packing also a breeze ....",
    //         createdAt: "2021-09-09T00:00:00.000Z",
    //         updatedAt: "2021-09-09T00:00:00.000Z",
    //         author: {
    //             name: "Seun Adebayo",
    //             picture: User.src,
    //         },
    //     },
    // ];

    return (
        <Flex direction="column" justify="flex-start" align="flex-start">
            <Flex direction="column" justify="flex-start" align="center">
                {/* <Text
                    type="p"
                    text="Blog Stories"
                    weight={400}
                    size={isMobile ? 16 : 24}
                    color="#06062A"
                    styles={{ lineHeight: "36px" }}
                /> */}

                {/* <Box>
                    <Text
                        type="h1"
                        text="ENJOY TRAVEL EXPERIENCE IN FORM OF A STORY"
                        weight={700}
                        size={isMobile ? 28 : 64}
                        styles={{
                            lineHeight: isMobile ? "42px" : "96px",
                            textAlign: "center",
                        }}
                        width={isMobile ? "384px" : "886px"}
                    />
                </Box> */}

                <SearchArea onFocus={handleInputFocus} onBlur={handleInputBlur}>
                    <Input
                        placeholder="Search for Blog Stories"
                        styles={{ border: "none", padding: "0px" }}
                        color="#929292"
                        width={isMobile ? "300px" : "575px"}
                        size="18px"
                        weight="400px"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                // handleSearch();
                                confirm(`want to search for ${searchTerm}?`);
                                setSearchTerm("");
                            }
                        }}
                    />
                    {isSearchResultsVisible && recentSearches.length > 0 && (
                        <SearchResultsContainer>
                            {recentSearches.map((term, index) => (
                                <SearchResultItem
                                    key={index}
                                    onClick={() => handleRecentSearch(term)}
                                >
                                    <Flex
                                        direction="row"
                                        align="center"
                                        gap="10px"
                                    >
                                        <AiOutlineClockCircle />
                                        <span>{term}</span>
                                    </Flex>
                                    <LiaTimesSolid
                                        onClick={() =>
                                            handleClearRecentSearch(index)
                                        }
                                    />
                                </SearchResultItem>
                            ))}
                        </SearchResultsContainer>
                    )}

                    <CiSearch
                        size="22.17px"
                        color="#B6B6B6"
                        onClick={handleSearch}
                        style={{ cursor: "pointer" }}
                    />
                </SearchArea>
            </Flex>
            {searchResultText && (
                <h2
                    style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        marginBottom: "4rem",
                    }}
                >
                    <span style={{ color: "#929292" }}>
                        Search Results for{" "}
                    </span>
                    <strong style={{ color: "#121212" }}>
                        {searchResultText}.
                    </strong>
                </h2>
            )}
            <Section>
                <Section margin="0rem 0 2rem">
                    <BlogTab
                        tabItems={tabItems}
                        addColor={true}
                        width={true}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </Section>
                {activeTab !== 1 && data?.length ? (
                    <Flex wrap="wrap" gap="2rem">
                        {data.map((blog, index) => (
                            <BlogCardMini key={index} blog={blog} />
                        ))}
                    </Flex>
                ) : (
                    <Section
                        maxWidth={isMobile ? "100%" : "525px"}
                        margin="auto"
                        padding={"10rem 0"}
                    >
                        <Section width="fit-content" margin="auto">
                            <Image
                                alt=""
                                src={
                                    "/assets/icons/articles/empty_blog_icon.svg"
                                }
                                height={120}
                                width={120}
                            />
                        </Section>
                        <Text
                            type="h5"
                            size={30}
                            weight={600}
                            margin={"2.5rem 0 2rem 0"}
                            text="No article found"
                            textAlign="center"
                        />
                        <p style={{ textAlign: "center" }}>
                            <Text
                                type="span"
                                size={18}
                                weight={400}
                                text={`There is currently no article in  section, `}
                            />
                            <Text
                                type="span"
                                size={18}
                                weight={800}
                                text={`${tabItems[activeTab].label}`}
                            />
                            <Text
                                type="span"
                                size={18}
                                weight={400}
                                text={` section, please check back later.`}
                            />
                        </p>
                    </Section>
                )}
            </Section>
        </Flex>
    );
};
