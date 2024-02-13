import styled from "styled-components";
import Image from "@atom/image";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import FavouriteCheckBox from "@/components/molecules/FavouriteCheckBox";
import withLikeHotel from "@/components/HOCs/withLikeHotel";
import currencyFormatter from "@/lib/extensions/data/currencyFormatter";
import { RefetchProp } from "types";


const FavouriteCard = styled.div`
  position: relative;
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;
const FavouriteCardImg = styled.div`
  position: relative;
  max-width: 370px;
  border-radius: 8px;
`;
const FavouriteCardIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 19px;
  padding: 5px;
  background: #ffffff;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    right: 20px;
  }
`;

interface Props {
  image: string;
  name: string;
  countryName: string;
  price: number;
  hotelId: string;
  refetch: RefetchProp;
  currencyCode?: string;
}

const EnhancedFavouriteCheckBox = withLikeHotel(FavouriteCheckBox);

function FavouritesCard({ image, name, countryName, price, hotelId, refetch, currencyCode }: Props) {

  return (
    <FavouriteCard>
      <FavouriteCardImg>
        <Image
          src={image.replace("{size}", "x500")}
          alt={name}
          width={370}
          height={258}
          styles={{ borderRadius: "8px", objectFit: 'cover' }}
        />
        <FavouriteCardIcon>
          <EnhancedFavouriteCheckBox id={hotelId} refetch={refetch} />
        </FavouriteCardIcon>
      </FavouriteCardImg>
      <Flex justify="space-between" width="370px">
        <Flex direction="column">
          <Text
            type="h3"
            text={name}
            size={20}
            weight={600}
            color="#000000"
          />
          <Text
            type="span"
            text={countryName}
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
            text={`${currencyFormatter(price, currencyCode)}`}
            size={20}
            weight={600}
            color="#000000"
          />
        </Flex>
      </Flex>
    </FavouriteCard>
  );
}

export default FavouritesCard;