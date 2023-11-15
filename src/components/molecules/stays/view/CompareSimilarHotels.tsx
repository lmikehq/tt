import Flex from "@/components/templates/flex";
import { Container, List, Header, GridLayout, ImageBox } from "./styles";
import Text from "@/components/atoms/text";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Rating } from "@mui/material";
import Link from "@/components/atoms/link";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useEffect, useState } from "react";
interface Room {
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
}

const rooms: Room[] = [
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    location: "4.3km away",
    rating: 4.5,
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    location: "4.3km away",
    rating: 1.5,
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    location: "4.3km away",
    rating: 2.5,
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    location: "4.3km away",
    rating: 3.0,
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    location: "4.3km away",
    rating: 3.0,
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    location: "4.3km away",
    rating: 4.0,
    price: 105000,
  },
];
// PRICE FORMAT
const formatPrice = (price: number) => `₦ ${price.toLocaleString()}`;

const CompareSimilarHotels = () => {
  //COMPONENT OPEN/CLOSE
  const [showCompareBox, setShowCompareBox] = useState(false);
  useEffect(() => {
    setShowCompareBox(true);
  }, []);
  const handleCloseCompareBox = () => {
    setShowCompareBox(false);
  };

  return (
    <>
      {showCompareBox && (
        <Container>
          <Header>
            <Flex justify="space-between">
              <Text
                weight={600}
                size={17}
                type="h4"
                text="Compare Similar Hotels"
              ></Text>
              <CloseOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={handleCloseCompareBox}
              />
            </Flex>
          </Header>

          <GridLayout>
            {rooms.map((room, index) => (
              <List key={index}>
                <Flex gap="15px" className="compare_recently">
                  <ImageBox>
                    <Link href="">
                      <img
                        src={room.image}
                        alt={room.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </ImageBox>
                  <Box>
                    <Flex direction="column" styles={{ lineHeight: "30px" }}>
                      <Link href="">
                        <Text weight={600} type="h4" text={room.name}></Text>
                      </Link>
                      <Flex gap={"5px"} align="center" justify="flex-start">
                        <PinDropIcon style={{ fontSize: "14px" }} />
                        <Text size={14} type="p" text={room.location}></Text>
                      </Flex>
                      <Rating
                        style={{
                          marginLeft: "-4px",
                          marginBottom: "5px",
                          fontSize: "17px",
                        }}
                        name="rating"
                        readOnly
                        precision={0.5}
                        max={5}
                        defaultValue={room.rating}
                      />
                      <Text
                        weight={600}
                        type="h4"
                        text={`${formatPrice(room.price)}`}
                      ></Text>
                    </Flex>
                  </Box>
                </Flex>
              </List>
            ))}
          </GridLayout>
        </Container>
      )}
    </>
  );
};

export default CompareSimilarHotels;
