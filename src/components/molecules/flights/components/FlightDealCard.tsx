"use client";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Box } from "@mui/material";

const ImageBox = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 20rem;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  border-radius: 8px;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  border: none;
  border-radius: 100px;
  width: 60px;
  height: 60px;
  cursor: pointer;

  background: url(${(props) =>
    props.isFavorite
      ? "/assets/icons/heart-filled.svg"
      : "/assets/icons/heart-empty.svg"});
  background-color: white;
  position: absolute;

  background-repeat: no-repeat;
  background-position: center;
  top: 20px;
  right: 20px;
`;

interface IFlightDealCard {
  city: string;
  country: string;
  startingPrice: number;
  isFavorite: boolean;
  imageURL: string;
}

export default function FlightDealCard(props: IFlightDealCard) {
  const { isMobile } = useScreenResolution();

  return (
    <Flex direction="column" gap="1rem">
      <Box sx={{ position: "relative" }}>
        <ImageBox imageUrl={props.imageURL} />
        <FavoriteButton isFavorite={props.isFavorite} />
      </Box>
      <Flex justify="space-between">
        <Flex direction="column" gap=".25rem">
          <Text
            type="h3"
            text={props.city}
            weight={700}
            size={isMobile ? 24 : 28}
          />
          <Text
            type="p"
            text={props.country}
            color="#606060"
            weight={500}
            size={isMobile ? 16 : 18}
          />
        </Flex>
        <Flex direction="column-reverse" gap=".25rem" align="flex-end">
          <Text
            type="h3"
            text={"$" + props.startingPrice.toLocaleString()}
            weight={700}
            size={isMobile ? 24 : 28}
          />
          <Text
            type="p"
            text="Starts from"
            color="#606060"
            weight={500}
            size={isMobile ? 16 : 18}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
