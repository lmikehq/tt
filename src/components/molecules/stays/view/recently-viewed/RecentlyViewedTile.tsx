import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import { Rating } from "@mui/material";

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
    image: "/assets/images/topCountries/Canada.jpeg",
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
];
const RecentlyViewedTile = () => {
  return (
    <>
      {rooms.map((room, index) => (
        <Section
          key={index}
          padding={"1rem"}
          styles={{
            borderRadius: "12px",
            border: "1px solid #EAEAEA",
            background: "#FFF",
          }}
        >
          <Flex gap="1rem">
            <Section
              height="121px"
              borderRadius="8px"
              styles={{ overflow: "hidden" }}
            >
              <Image
                alt="stay"
                src={room.image}
                styles={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Section>
            <Flex direction="column" justify="space-between">
              <Section>
                <Text
                  type="p"
                  size={18}
                  weight={500}
                  className="truncate"
                  text={room.name}
                />
                <Flex gap="0.1rem">
                  <Image
                    alt="location"
                    src={"/assets/icons/stay/view/location_radius_icon.svg"}
                    width={24}
                    height={24}
                  />
                  <Text type="p" size={16} text="4.3km away" />
                </Flex>
              </Section>

              <Section>
                <Flex>
                  <Rating
                    style={{
                      marginLeft: "-4px",
                      marginBottom: "5px",
                      fontSize: "17px",
                    }}
                    name="rating"
                    readOnly
                    max={5}
                    defaultValue={room.rating}
                  />
                </Flex>
                <Flex gap="0.5rem" align="center" margin="1rem 0 0 0">
                  <Text type="p" size={16} weight={600} text={getCurrency()} />
                  <Text
                    type="p"
                    size={18}
                    weight={600}
                    text={formatPriceWithoutCurrency(81500)}
                  />
                </Flex>
              </Section>
            </Flex>
          </Flex>
        </Section>
      ))}
    </>
  );
};

export default RecentlyViewedTile;
