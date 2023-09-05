import Center from "src/components/atoms/center";
import NoVisa from "@image/noVisa.png";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "hook/useScreenResolution";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";

const Favourite = () => {
  const { isMobile } = useScreenResolution();

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
      <Center margin="10rem 0" height="25rem">
        <NoVisaApplication noVisaImage={NoVisa} content={content} />
      </Center>
      {/* <FavouriteWrapper>
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
              <FavouriteCardIcon>
                <AiFillHeart size="1.5rem" color="red" />
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
      </FavouriteWrapper> */}
    </Section>
  );
};

export default Favourite;
