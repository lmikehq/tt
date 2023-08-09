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
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${ttColors.primary};
  }

  & .howWeGotHere {
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 900px) {
      grid-template-columns:  1fr;
    }
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
    border: 2px solid ${ttColors.primary};
  }

  
`;

const Fleft = styled.div`
  width: 50%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const StoryContent = styled.div`
  width: 100%;

  @media screen and (max-width: 1024px) {
    height: 350px;
    overflow: scroll;
    padding-right: 1rem;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
  }
`;



const Fright = styled.div`
  width: 50%;
  margin-top: 4.5rem;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  & img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid ${ttColors.primary};
  }

  @media screen and (max-width: 900px) {
    margin-top: 0;
  }
`;


const VCard = styled.div`
  height: 200px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 1rem;
  overflow: scroll !important;
  text-align: center;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid ${ttColors.primary};
  }

  & h3 {
    margin-bottom: 1rem;
    color: ${ttColors.dark};
    font-size: 1.5rem;
  }
`;

const AboutUsPage = () => {
  const { isMobile } = useScreenResolution();
  const carouselData = [
    {
      id: 1,
      title: "Integrity",
      description:
        "At Thrillers Travels, we uphold a strong moral compass. We believe in transparency, honesty, and consistency in all our dealings. We honor our commitments and take responsibility for our actions. Our reputation is built on our trustworthiness and genuineness.",
    },

    {
      id: 2,
      title: "Excellence",
      description:
        "We strive for the highest standards in all we do. We are committed to delivering exceptional services to our clients and continuously improving our processes and offerings. We're not just another booking site; we're a comprehensive solution that addresses the broader needs of global explorers and learners. We are not a travel agent, but a travel industry that host all other agencies across the world. For us, 'good enough' is never enough.",
    },

    {
      id: 3,
      title: "Innovation",
      description:
        "We champion creative thinking and unique solutions. We embrace change and view challenges as opportunities to learn and grow. Our innovative platform has come to our aids by understand the complexities of travel planning and international work and education pursuit. We're not afraid to take risks in pursuit of excellence and groundbreaking innovation, and we're here to simplify that process for all our customer's.",
    },

    {
      id: 4,
      title: "Respect",
      description:
        "We believe in treating all people with dignity and fairness. We listen and respond to the views of others, and we value diversity and inclusion. We're committed to fostering a conducive environment with mutual respect and cultural balances.",
    },

    {
      id: 5,
      title: "Collaboration",
      description:
        "We understand that success is a team effort, commitment, and time. We work collaboratively, leveraging the unique talents and insights of each member to achieve our shared goals. We believe in open and effective communication channel,  power of collective intelligence, and the common enthusiasm.",
    },

    {
      id: 6,
      title: "Customer Centricity",
      description:
        "Our customers are at the heart of everything we do. We work round the clock in order to serve you better, we strive to understand their needs through empathy and customers relationship management, always exceed their expectations, and deliver value at every step of their journey with us.",
    },

    {
      id: 7,
      title: "Adaptability",
      description:
        "We thrive in dynamic and ever-changing environments. Our ability to adapt quickly to new situations and circumstances sets us apart. We embrace uncertainty and view it as an opportunity to pivot, innovate, and find creative solutions. Our adaptable mindset ensures we remain relevant and responsive in an ever-evolving travel landscape.",
    },

    {
      id: 8,
      title: "Environmental Stewardship",
      description:
        "We are deeply committed to the preservation of our planet. We recognize the impact of travel on the environment and actively seek ways to minimize our ecological footprint. Through sustainable practices, responsible tourism, and ongoing initiatives, we contribute to the protection of natural resources and the well-being of local communities, ensuring that our journeys leave a positive, lasting legacy.",
    },

    {
      id: 9,
      title: "Empowerment",
      description:
        "We empower both our team members and our customers to achieve their full potential. We cultivate an environment of continuous learning, growth, and personal development. By providing the necessary tools, resources, and support, we enable individuals to take ownership of their travel aspirations and professional roles. We believe that empowered individuals drive meaningful change and contribute to the collective success of our community.",
    },

    {
      id: 10,
      title: "Global Citizenship",
      description:
        "We embrace the role of global citizens, understanding that our actions impact not only individuals but also the broader global community. We foster a sense of responsibility towards cultural exchange, social harmony, and global progress. By facilitating connections, promoting understanding, and encouraging ethical practices, we contribute to a more interconnected and compassionate world, one journey at a time.",
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
            <Text
              text="Our Story"
              type="h1"
              size={isMobile ? "1.9rem" : "2.5rem"}
            />
            <StoryContent>
              <Text
                size={isMobile ? "1rem" : "1.3rem"}
                type="p"
                text="Thrillers Travels is an innovative and comprehensive travel and education consultancy platform targeting the modern, digitally-oriented traveler, professionals seeking to relocate from one location to another to work or just explore the modern world, and also the student seeking to explore the world with ease and efficiency. We understand the complexities of travel planning and international work and education pursuit, and we're here to simplify that process through our expertise and our associate across the globes."
              />

              <br />

              <Text
                size={isMobile ? "1rem" : "1.3rem"}
                type="p"
                text="Our fervor lies in delivering extraordinary travel encounters that imprint enduring memories. With a wealth of industry experience under our belt, we have positioned ourselves as a reliable ally for discerning globe-trotters such as yourself. Our venture, Thrillers Travels, embodies an enticing opportunity for investors to participate in a transformative concept of travel and learning. We go beyond being a typical booking platform; we are an all-encompassing solution catering to the wider needs of international adventurers and scholars. We extend an invitation to you to accompany us on this exhilarating journey as we reshape the travel and education sectors, making it more attainable, streamlined, and enjoyable for all."
              />
            </StoryContent>
          </Fleft>
          <Fright>
            <Image src={team} alt="teamImage" />
          </Fright>
        </Flex>

        <Flex
          gap={isMobile ? "1rem" : "1.5rem"}
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          width="100%"
        >
          <Flex direction="column" width={isMobile ? "100%" : "50%"}>
            <Text
              size={isMobile ? "1.9rem" : "2.5rem"}
              type="h1"
              text="How will get here"
            />

            <Text
              size={isMobile ? "1rem" : "1.3rem"}
              type="p"
              text="voluptates praesentium ratione provident iusto suscipit sequi nesciunt! Dolor sequi fugit, quasi iusto cum aperiam perspiciatis modi veniam commodi porro voluptas blanditiis? Nemo ipsa fuga, veniam cupiditate porro saepe consequatur, accusantium, hic facilis unde asperiores laboriosam aperiam quaerat iusto? "
            />
            <br />
            <Text
              size={isMobile ? "1rem" : "1.3rem"}
              type="p"
              text="voluptates praesentium ratione provident iusto suscipit sequi nesciunt! Dolor sequi fugit, quasi iusto cum aperiam perspiciatis modi veniam commodi porro voluptas blanditiis? Nemo ipsa fuga, veniam cupiditate porro saepe consequatur, accusantium, hic facilis unde asperiores laboriosam aperiam quaerat iusto? "
            />
          </Flex>

          <Grid
            gap="1.5rem"
            columns={isMobile ? "1fr" : "repeat(3, 1fr)"}
            width={isMobile ? "100%" : "70%"}
            className="howWeGotHere"
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
            src="https://www.youtube.com/watch?v=BjFHQ6ssUFI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Flex>

        <Grid columns={isMobile ? "1fr" : "repeat(3, 1fr)"} gap="1rem">
          <VCard>
            <Text
              type="h3"
              text="Our Vision"
              styles={{
                fontSize: isMobile ? "1.9rem" : "2.5rem",
              }}
            />
            <Text
              type="p"
              text="Positioning Nigerians to
play key roles in the next
phase of industrial
revolution through
exposition by migration
and resettlement"
              styles={{ textAlign: "center" }}
            />
          </VCard>
          <VCard>
            <Text type="h3" text="Our Mission" />
            <Text
              type="p"
              text="To influence Nigerians
with western emergence
and sustainability ideology
for National Development."
            />
          </VCard>
          <VCard>
            <Text type="h3" text="Why Always Us" />
            <Text
              type="p"
              text="Our platform is a one-stop shop for all your travel needs. It provides a streamlined, user-friendly interface for booking flights, hotels, and cars. We partner with a  wide range of service providers across the globe, ensuring our users have a broad array of options to choose from, tailored to their budgets and preferences. e work with a network of immigration attorneys who handle the complexities of visa processing, alleviating the stress and uncertainty typically associated with this process.  Between the years 2021-2023, we are privileged to relocate many Nigerians and outside the countries like UAE, Singaporeans, and from other parts of the world to Canada, New Zealand. Australia & UK."
            />
          </VCard>
        </Grid>

        <Carousel items={carouselData} />
      </Flex>
    </AboutUsWrapper>
  );
};

export default AboutUsPage;
