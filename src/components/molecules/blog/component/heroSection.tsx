import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { AdminPost } from "./adminPost";
import BlogTab from "@/components/atoms/blogTab";

const Box = styled.div`
  width: 886px;
`;



export const BlogHeroSection = () => {
  const tabItems = [
    {
      label: "All Applications",
      value: 0,
      content: <AdminPost />,
    },
    {
      label: "Payment History",
      value: 1,
      content: "lol",
    },
    {
      label: "Favourites",
      value: 2,
      content: "<Favourite />",
    },

    {
      label: "Notifications",
      value: 3,
      content: "<Notification />",
    },

    {
      label: "Account",
      value: 4,
      content: "<Account />",
    },
    {
      label: "Referral",
      value: 5,
      content: "<Referrals />",
    },
  ];
  return (
    <Flex direction="column" justify="center" align="center">
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
          width="300px"
          size="18px"
          weight="400px"
        />

        <CiSearch size="22.17px" color="#B6B6B6" />
      </Flex>
      <Flex justify="space-between" gap="">
        <BlogTab shadowShow tabItems={tabItems} />
        <div style={{ width: "50%" }}></div>
      </Flex>
    </Flex>
  );
};
