import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { AdminPost } from "./adminPost";
import { SearchResult } from "./searchResult";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

const Box = styled.div`
  width: 886px;
`;

const SearchArea = styled.div`
  position: relative;
  width: 652px;
  border: 1px solid #b6b6b6;
  border-radius: 8px;
  margin-top: 1rem;
  background-color: #ffffff;
  top: 30px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 23px;
  margin: 4rem 0rem;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchResultText, setSearchResultText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = () => {
    setSearchTriggered(true);
    setSearchResultText(
      `Search Results for ${
        searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
      }.`
    );

    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleRecentSearch = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  const handleClearRecentSearch = (index: number) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches);
  };

  const renderContent = () => {
    if (searchTriggered) {
      return <SearchResult />;
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
          size={24}
          color="#06062A"
          styles={{ lineHeight: "36px" }}
        />

        <Box>
          <Text
            type="h1"
            text="ENJOY TRAVEL EXPERIENCE IN FORM OF A STORY"
            weight={700}
            size={64}
            styles={{ lineHeight: "96px", textAlign: "center" }}
          />
        </Box>

        <SearchArea>
          <Input
            placeholder="Search for Blog Stories"
            styles={{ border: "none", padding: "0px" }}
            color="#929292"
            width="575px"
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
          {recentSearches.length > 0 && (
            <SearchResultsContainer>
              {recentSearches.map((term, index) => (
                <SearchResultItem
                  key={index}
                  onClick={() => handleRecentSearch(term)}
                >
                  <Flex direction="row" align="center" gap="10px">
                    <AiOutlineClockCircle />
                    <span>{term}</span>
                  </Flex>
                    <LiaTimesSolid
                      onClick={() => handleClearRecentSearch(index)}
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
        {/* </Flex> */}
      </Flex>
      <Text type="h2" text={searchResultText} color="#929292" size="40px" />
      {renderContent()}
    </Flex>
  );
};
