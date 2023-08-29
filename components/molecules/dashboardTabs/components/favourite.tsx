import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";
import { useScreenResolution } from "hook/useScreenResolution";
import { FaFileDownload } from "react-icons/fa";
import VisaDashboardHeader from "./visaDashboardHeader";
import Section from "@molecule/section";
import { AiFillHeart } from "react-icons/ai";
import FavouriteImg1 from "@image/favourite/favourite1.png";
import FavouriteImg2 from "@image/favourite/favourite2.png";
import Image from "@atom/image";

const SectionTitle = styled.div`
  display: flex;

  & h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    margin: 20px 0px 15px;
    line-height: 48px;
    /* identical to box height */

    color: ${ttColors.dark};
    @media screen and (max-width: 390px) {
      margin: 0px 0px -4px !important;
    }
  }
`;

const Items = styled.div`
  border: 1px solid #e7e7e7;
  padding: 20px;
  width: 100%;
  border-radius: 28px;
`;

const FavouriteWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;


  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const FavouriteCard = styled.div`
  width: 370px;
  border-radius: 4px;

`;

const FavouriteCardImg = styled.div`
  position: relative;
`;

const FavouriteCardIcon = styled.div`
  background: #fff;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 305px;
`;

const Favourite = () => {
  const { isMobile } = useScreenResolution();

  const FavouriteRecords = [
    {
      id: 1,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },

    {
      id: 2,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },

    {
      id: 3,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },

    {
      id: 4,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },
  ];
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "20px",
        padding: "2.5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Favourites" />

      <FavouriteWrapper>
        <Grid columns="1fr 1fr 1fr" gap="2rem">
          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg1}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Venice"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Italy"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,000"
                  size={24}
                  weight={700}
                  color="#000000"
                />
              </Flex>
            </Flex>
          </FavouriteCard>

          <FavouriteCard>
            <FavouriteCardImg>
              <Image
                src={FavouriteImg2}
                alt=""
                width={370}
                height={258}
                styles={{ borderRadius: "4px" }}
              />
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Atalanta"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="United State"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$1,850"
                  size={24}
                  weight={700}
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
              </FavouriteCardIcon>
            </FavouriteCardImg>
            <Flex justify="space-between" width="370px">
              <Flex direction="column">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  size={24}
                  weight={700}
                  color="#000000"
                />
                <Text
                  type="span"
                  text="Brazil"
                  size={18}
                  weight={500}
                  color="#606060"
                />
              </Flex>
              <Flex direction="column" align="flex-end">
                <Text
                  type="span"
                  text="Starts from"
                  size={18}
                  weight={500}
                  color="#606060"
                />
                <Text
                  type="h3"
                  text="$2,250"
                  size={24}
                  weight={700}
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
