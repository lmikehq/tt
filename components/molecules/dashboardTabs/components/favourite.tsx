
import NoVisa from "@image/noVisa.png";
import { useScreenResolution } from "hook/useScreenResolution";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
import FavouriteImg1 from "@image/favourite/favourite1.png";
import FavouriteImg2 from "@image/favourite/favourite2.png";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import Section from "components/molecules/section";
import { Grid } from "components/atoms/grid";
import Flex from "components/atoms/flex";
import Text from "components/atoms/text";
import Image from "components/atoms/image";

const FavouriteWrapper = styled.div``;
const FavouriteCard = styled.div`
position: relative`;
const FavouriteCardImg = styled.div``;
const FavouriteCardIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 145px;
  padding: 5px;
  background: #ffffff;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    right: 20px
  }
`;

const Favourite = () => {
  const { isMobile } = useScreenResolution();
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const heartColor = isFavourite ? "red" : "grey";

  const content = {
    title: "You’ve got no favorite - Let’s help you get Started",
    links: [
      { text: "Apply for Visa", url: "/apply/visa" },
      { text: "Book flight", url: "/flight" },
    ],
  };
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "20px",
        padding: ".5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Favourites" />
      {/* <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
        <NoVisaApplication noVisaImage={NoVisa} content={content} />
      </Center> */}
      <FavouriteWrapper>
        <Grid columns={isMobile ? "1" : "3"} gap={isMobile ? "1.5rem" : "1rem"}>
          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg1}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon onClick={toggleFavourite}>
                <AiFillHeart size="1.5rem" color={heartColor} />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={20}
                  weight={600}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={16}
                  weight={400}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={16}
                  weight={400}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={20}
                  weight={600}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg1}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon onClick={toggleFavourite}>
                <AiFillHeart size="1.5rem" color={heartColor} />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={20}
                  weight={600}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={16}
                  weight={400}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={16}
                  weight={400}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={20}
                  weight={600}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg1}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon onClick={toggleFavourite}>
                <AiFillHeart size="1.5rem" color={heartColor} />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={20}
                  weight={600}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={16}
                  weight={400}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={16}
                  weight={400}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={20}
                  weight={600}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>
        </Grid>
      </FavouriteWrapper>
    </Section>
  );
};

export default Favourite;
