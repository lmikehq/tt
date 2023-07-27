"use client";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Image from "@atom/image";
import styled from "styled-components";
import team from "@image/Business-Team.jpeg";
import { useScreenResolution } from "hook/useScreenResolution";
import { ttColors } from "theme/colors";
import Text from "@atom/text";
import Carousel from "@molecule/carouselComponent";

const AboutUsWrapper = styled.div`
  & h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${ttColors.primary};
  }
`;

const Card = styled.div`
  height: fit-content;
  width: 100%;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-left: 5px solid ${ttColors.primary};
  padding: 1rem;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Fleft = styled.div`
  width: 50%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
const Fright = styled.div`
  width: 50%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid ${ttColors.primary};
  }
`;

const VCard = styled.div`
  height: fit-content;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 1rem;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  & h3 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const AboutUsPage = () => {
  const { isMobile } = useScreenResolution();
  const carouselData = [
    {
      id: 1,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 2,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 3,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 4,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 5,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 6,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 7,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 8,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 9,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },

    {
      id: 10,
      title: "Customer-Centric Travel Simplified!",
      description:
        "Unlocking travel dreams with an obsession for customers! We're on a mission to simplify your journey, available round-the-clock. We're here 24/7, eager listeners, going above and beyond.  Attentive, patient, and going the extra mile, we ensure seamless documentation for you! Let's embark on unforgettable adventures together! 🌍✈️ #CustomerFirst #TravelSimplified #DreamExploreDiscover.",
    },
  ];

  return (
    <AboutUsWrapper>
      <Flex direction="column" gap="5rem" margin="2rem 0px">
        <Flex
          gap="1.5rem"
          justify="space-between"
          width="100%"
          direction={isMobile ? "column" : "row"}
        >
          <Fleft>
            <h1>Our Story </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
              cumque vitae? Eos distinctio velit molestiae, nobis at perferendis
              non earum aperiam quo corrupti perspiciatis quaerat in pariatur
              eveniet placeat ad minus ex doloribus quas nam! Praesentium eius,
              repudiandae cupiditate voluptas vitae distinctio odio, porro omnis
              eaque modi totam laborum dolorem reprehenderit illum saepe
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              sapiente autem qui harum provident magni numquam molestias animi
              dicta? Tenetur magni necessitatibus laboriosam inventore at nam,
              illo officiis voluptas eius provident nobis ducimus, ipsam dolorem
              accusamus voluptatem cum, quam ratione quasi? Eveniet incidunt
              dolores numquam assumenda, beatae eum minima dicta.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              sapiente autem qui harum provident magni numquam molestias animi
              dicta? Tenetur magni necessitatibus laboriosam inventore at nam,
              illo officiis voluptas eius provident nobis ducimus, ipsam dolorem
              accusamus voluptatem cum, quam ratione quasi? Eveniet incidunt
              dolores numquam assumenda, beatae eum minima dicta.
            </p>
          </Fleft>
          <Fright>
            <Image src={team} alt="teamImage" />
          </Fright>
        </Flex>

        <Flex
          gap="1.5rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          width="100%"
        >
          <Flex direction="column" width={isMobile ? "100%" : "40%"}>
            <Text
              styles={{ width: "100%" }}
              type="h1"
              text="How will get here"
            />

            <Text
              type="p"
              text="voluptates praesentium ratione provident iusto suscipit sequi nesciunt! Dolor sequi fugit, quasi iusto cum aperiam perspiciatis modi veniam commodi porro voluptas blanditiis? Nemo ipsa fuga, veniam cupiditate porro saepe consequatur, accusantium, hic facilis unde asperiores laboriosam aperiam quaerat iusto? "
            />
            <br />
            <Text
              type="p"
              text="voluptates praesentium ratione provident iusto suscipit sequi nesciunt! Dolor sequi fugit, quasi iusto cum aperiam perspiciatis modi veniam commodi porro voluptas blanditiis? Nemo ipsa fuga, veniam cupiditate porro saepe consequatur, accusantium, hic facilis unde asperiores laboriosam aperiam quaerat iusto? "
            />
          </Flex>

          <Grid
            gap="1.5rem"
            columns={isMobile ? "1fr" : "repeat(3, 1fr)"}
            width={isMobile ? "100%" : "70%"}
          >
            <Card>
              <Text type="h3" text="2018" />
              <Text
                type="p"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
              />
            </Card>
            <Card>
              <Text type="h3" text="2019" />
              <Text
                type="p"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
              />
            </Card>
            <Card>
              <Text type="h3" text="2020" />
              <Text
                type="p"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
              />
            </Card>
            <Card>
              <Text type="h3" text="2021" />
              <Text
                type="p"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
              />
            </Card>
            <Card>
              <Text type="h3" text="2022" />
              <Text
                type="p"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
              />
            </Card>
            <Card>
              <Text type="h3" text="2023" />
              <Text
                type="p"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
              />
            </Card>
          </Grid>
        </Flex>

        <Flex gap="1.5rem" justify="center">
          <iframe
            width="100%"
            height="415"
            src="https://www.youtube.com/watch?v=fFxrKJa0BUY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Flex>

        <Grid columns={isMobile ? "1fr" : "repeat(3, 1fr)"} gap="1rem">
          <VCard>
            <Text type="h3" text="Our Vision" />
            <Text
              type="p"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
            />
          </VCard>
          <VCard>
            <Text type="h3" text="Our Mission" />
            <Text
              type="p"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
            />
          </VCard>
          <VCard>
            <Text type="h3" text="What We Do" />
            <Text
              type="p"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nisi magni at nobis vitae dolorum dolor, nam, sint
            aliquam aperiam, libero sequi aut temporibus distinctio praesentium
            laborum! Quos, vero!"
            />
          </VCard>
        </Grid>

        <Carousel items={carouselData} />
      </Flex>
    </AboutUsWrapper>
  );
};

export default AboutUsPage;
