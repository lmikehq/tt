import styled from "styled-components"
import { AiFillHeart } from "react-icons/ai"
import Image from "@atom/image"
import Flex from "@components/templates/flex"
import Text from "@atom/text"
import { useState } from "react"


const FavouriteCard = styled.div`
  position: relative;
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`
const FavouriteCardImg = styled.div`
  position: relative;
  max-width: 370px;
  border-radius: 8px;
`
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
`

function FavouritesCard() {
  const [isFavourite, setIsFavourite] = useState(false)

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite)
  }
  const heartColor = isFavourite ? "red" : "grey"

  return (
    <FavouriteCard>
      <FavouriteCardImg>
        <Image
          src="/assets/images/favourite/favourite1.png"
          alt=""
          width={370}
          height={258}
          styles={{ borderRadius: "8px", objectFit: 'cover' }}
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
  )
}

export default FavouritesCard