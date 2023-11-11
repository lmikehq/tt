// import Input from "@/components/atoms/input";
// import Text from "@/components/atoms/text";
// import Flex from "@/components/templates/flex";
// import { CiSearch } from "react-icons/ci";
// import styled from "styled-components";
// import { AdminPost } from "./adminPost";
// import BlogTab from "@/components/atoms/blogTab";
// import CustomTab from "@/components/atoms/tabs";
// import { SearchResult } from "./searchResult";
// import { useState } from "react";

// const Box = styled.div`
//   width: 886px;
// `;


// export const BlogHeroSection = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchTriggered, setSearchTriggered] = useState(false);
//   const [searchResultText, setSearchResultText] = useState("");

//   const handleSearch = () => {
//     setSearchTriggered(true);
//     setSearchResultText(`Search Results for ${searchTerm}.`);
//   };

//   const renderContent = () => {
//     if (searchTriggered) {
//       return <SearchResult />;
//     } else {
//       return <AdminPost />;
//     }
//   };

//   return (
//     <Flex direction="column" justify="flex-start" align="flex-start">
//       <Flex direction="column" justify="flex-start" align="center">
//         <Text
//           type="p"
//           text="Blog Stories"
//           weight={400}
//           size={24}
//           color="#06062A"
//           styles={{ lineHeight: "36px" }}
//         />

//         <Box>
//           <Text
//             type="h1"
//             text="ENJOY TRAVEL EXPERIENCE IN FORM OF A STORY"
//             weight={700}
//             size={64}
//             styles={{ lineHeight: "96px", textAlign: "center" }}
//           />
//         </Box>

//         <Flex
//           direction="row"
//           justify="space-between"
//           align="center"
//           border="1px solid #b6b6b6"
//           height="72px"
//           width="652px"
//           borderRadius="8px"
//           padding="0px 23px"
//           margin="4rem 0rem"
//           borderBottom="1px solid #b6b6b6"
//         >
//           <Input
//             placeholder="Search for Blog Stories"
//             styles={{ border: "none", padding: "0px" }}
//             color="#929292"
//             width="575px"
//             size="18px"
//             weight="400px"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSearch();
//               }
//             }}
//           />

//           <CiSearch
//             size="22.17px"
//             color="#B6B6B6"
//             onClick={handleSearch}
//             style={{ cursor: "pointer" }}
//           />
//         </Flex>
//       </Flex>
//       <Text type="h2" text={searchResultText} color="#929292" size="40px" />
//       {renderContent()}
//     </Flex>
//   );
// };


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
import { Preview } from "@/app/blog/preview";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

const Box = styled.div`
  width: 886px;

  @media (max-width: 900px) {
    width: 380px;
  }
`;

const CustomText = styled.div`
  margin-bottom: 4rem;
  font-size: 40px;

  p {
    color: #929292;
    font-weight: 600; /* Corrected typo: 'weight' to 'font-weight' */
  }
  span {
    font-weight: 700;
    color: #121212;
  }
`;

export const BlogHeroSection = () => {
  const { isMobile } = useScreenResolution();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchResultText, setSearchResultText] = useState("");

  const handleSearch = () => {
    setSearchTriggered(true);
    setSearchResultText(`Search Results for ${searchTerm}.`);
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
            size={isMobile ? 26 : 64}
            styles={{
              lineHeight: isMobile ? "40px" : "96px",
              textAlign: "center",
            }}
          />
        </Box>

        <Flex
          direction="row"
          justify="space-between"
          align="center"
          border="1px solid #b6b6b6"
          height="72px"
          width={isMobile ? "350px" : "652px"}
          borderRadius="8px"
          padding="0px 23px"
          margin="4rem 0rem"
          borderBottom="1px solid #b6b6b6"
        >
          <Input
            placeholder="Search for Blog Stories"
            styles={{ border: "none", padding: "0px" }}
            color="#929292"
            width={isMobile ? "275px" : "575px"}
            size={isMobile ? "16" : "18px"}
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
      </Flex>

      {/* Display search result text */}
      <Text type="h2" text={searchResultText} color="#929292" size="40px" styles={{marginBottom: "30px"}} />

      {/* Conditionally render content based on search */}
      {/* {searchTriggered ? <SearchResult /> : <AdminPost />} */}
      {searchTriggered ? (
        <SearchResult />
      ) : (
        <>
          <AdminPost />
          {/* Optionally include default content when search is not triggered */}
        </>
      )}
    </Flex>
  );
};
