import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { AdminPost } from "./adminPost";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import BlogResults from "@/components/organisms/blog/BlogResults";

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
    top: 30px;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 23px;
    margin: 3rem 0rem 6rem;

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
        setSearchResultsVisible(true);
    };

    const handleInputBlur = () => {
        setSearchResultsVisible(false);
    };

    const renderContent = () => {
        if (searchTriggered) {
            return <BlogResults />;
        } else {
            return <AdminPost />;
        }
    };

    return (
        <Flex direction="column" justify="flex-start" align="flex-start">
            <Flex direction="column" justify="flex-start" align="center">
                <Text
                    type="p"
                    text="Blog Stories"
                    weight={400}
                    size={isMobile ? 16 : 24}
                    color="#06062A"
                    styles={{ lineHeight: "36px" }}
                />

                <Box>
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
                </Box>

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
                                handleSearch();
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
            {renderContent()}
        </Flex>
    );
};
