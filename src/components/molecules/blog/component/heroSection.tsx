import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { AdminPost } from "./adminPost";
import BlogTab from "@/components/atoms/blogTab";
import CustomTab from "@/components/atoms/tabs";
import { SearchResult } from "./searchResult";
import { useState } from "react";

const Box = styled.div`
  width: 886px;
`;

const CustomText = styled(Text)`
  position: relative;
  left: -660px;
  margin-bottom: 4rem;
  font-size: 20px; /* You can adjust the font size here */
  /* Add any other necessary styles */
`;


export const BlogHeroSection = () => {

   const [searchTerm, setSearchTerm] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
   const [searchResultText, setSearchResultText] = useState("");

   const handleSearch = () => {
     // Perform the search functionality here based on the 'searchTerm'.
     // This can be an API call or custom logic to fetch search results.
     setSearchTriggered(true);
     setSearchResultText(
       `Result of your search for ${searchTerm}.`
     );
   };

   const renderContent = () => {
     if (searchTriggered) {
       return <SearchResult />;
     } else {
       return <AdminPost />;
     }
   };

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

      <Flex
        direction="row"
        justify="space-between"
        align="center"
        border="1px solid #b6b6b6"
        height="72px"
        width="652px"
        borderRadius="8px"
        padding="0px 23px"
        margin="4rem 0rem"
        borderBottom="1px solid #b6b6b6"
      >
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

        <CiSearch
          size="22.17px"
          color="#B6B6B6"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </Flex>
      <CustomText
        type="h2"
        size="20px"
        text={searchResultText}
        styles={{
          position: "relative",
          left: "-660px",
          marginBottom: "4rem",
        }}
      />
      {renderContent()}
    </Flex>
  );
};
