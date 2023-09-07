"use client";

import styled from "styled-components";
import DestinationLayout from "src/components/layouts/sectionLayout";
import Link from "src/components/atoms/link";
import Text from "src/components/atoms/text";
import Flex from "src/components/atoms/flex";
import { Grid } from "@components/templates/grid";
import { BsDot } from "react-icons/bs";
import React from "react";
import SectionTitle from "src/components/molecules/sectionTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import Image from "@atom/image";
import Section from "@molecule/section";

const DestinationWrapper = styled.div`
  // margin: 5rem 0;
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  margin-bottom: 1rem;

  width: 100%;
  height: 115px;
  color: var(--secondary-color);
  /* Neutrals */

  background: #ffffff;
  /* Cards Shadow */

  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  border-radius: 16px;

  & img {
  }

  & h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }

  & p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;

const PopularDestinations = ({
  title = "Popular Destinations",
}: {
  title?: string;
}) => {
  const destinationCard = [
    {
      id: 1,
      image: "/assets/images/popularDestination/canada.png",
      title: "Toronto, Canada",
      description: "Visa . Employment . Apply",
      name: "Canada",
    },

    {
      id: 2,
      image: "/assets/images/popularDestination/newZealand.png",
      title: "Auckland, New Zealand",
      description: "Visa . Employment . Apply",
      name: "New Zealand",
    },

    {
      id: 3,
      image: "/assets/images/popularDestination/norway.png",
      title: "Oslo, Norway",
      description: "Visa . Employment . Apply",
      name: "Norway",
    },

    {
      id: 4,
      image: "/assets/images/popularDestination/uk.png",
      title: "London, United Kingdom",
      description: "Visa . Employment . Apply",
      name: "United Kingdom",
    },

    {
      id: 5,
      image: "/assets/images/popularDestination/us.png",
      title: "New York, United States",
      description: "Visa . Employment . Apply",
      name: "United States",
    },

    {
      id: 6,
      image: "/assets/images/popularDestination/switzerland.png",
      title: "Zurich, Switzerland",
      description: "Visa . Employment . Apply",
      name: "Switzerland",
    },

    {
      id: 7,
      image: "/assets/images/popularDestination/australia.png",
      title: "Sydney, Australia",
      description: "Visa . Employment . Apply",
      name: "Australia",
    },

    {
      id: 8,
      image: "/assets/images/popularDestination/singapore.png",
      title: "Singapore, Singapore",
      description: "Visa . Employment . Apply",
      name: "Singapore",
    },

    {
      id: 9,
      image: "/assets/images/popularDestination/germany.png",
      title: "Berlin, Germany",
      description: "Visa . Employment . Apply",
      name: "Germany",
    },
  ];

  const { isMobile } = useScreenResolution();

  const router = useRouter();

  return (
    <DestinationWrapper>
      <DestinationLayout>
        <SectionTitle
          title={title}
          description="Explore our popular destinations to find the best option for your next adventure!"
          buttonText={isMobile ? "" : "See more countries"}
          href="/visa/countries"
        />
        <Grid
          columns={isMobile ? "1fr" : "3"}
          gap="16px"
          className="destinationCard"
        >
          {destinationCard
            .slice(0, isMobile ? 4 : undefined)
            .map((destination) => (
              <Link
                key={destination.id}
                href={`/visa/apply?destination=${destination.name}`}
              >
                <Card>
                  <Flex justify="space-between" gap="1rem">
                    <Section
                      height="90px"
                      width="90px"
                      styles={{ flex: "none" }}
                    >
                      <Image
                        src={destination.image}
                        alt=""
                        width={90}
                        height={90}
                      />
                    </Section>

                    <Flex direction="column" alignSelf="center">
                      <Text type="h3" text={destination.title} />
                      <Flex>
                        {destination.description
                          .split(".")
                          .map((desc, index) => (
                            <React.Fragment key={index}>
                              <Text type="p" text={desc.trim()} />
                              {index !==
                                destination.description.split(".").length -
                                  1 && <BsDot />}
                            </React.Fragment>
                          ))}
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            ))}
        </Grid>
        <SectionTitle
          title=""
          description=""
          buttonText={isMobile ? "See more countries" : ""}
          href="/visa/countries"
        />
      </DestinationLayout>
    </DestinationWrapper>
  );
};

export default PopularDestinations;
