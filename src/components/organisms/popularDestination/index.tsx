"use client";

import styled from "styled-components";
import DestinationLayout from "src/components/layouts/sectionLayout";
import Link from "src/components/atoms/link";
import Text from "src/components/atoms/text";
import Flex from "src/components/atoms/flex";
import { Grid } from "src/components/atoms/grid";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import Canada from "@image/popularDestination/canada.png";
import NewZealand from "@image/popularDestination/newZealand.png";
import Norway from "@image/popularDestination/norway.png";
import Uk from "@image/popularDestination/uk.png";
import Us from "@image/popularDestination/us.png";
import Switzerland from "@image/popularDestination/switzerland.png";
import Australia from "@image/popularDestination/australia.png";
import Singapore from "@image/popularDestination/singapore.png";
import Germany from "@image/popularDestination/germany.png";
import React from "react";
import SectionTitle from "src/components/molecules/sectionTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";

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
    width: 90px;
    height: 90px;
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
      image: Canada,
      title: "Toronto, Canada",
      description: "Visa . Employment . Apply",
      name: "Canada",
    },

    {
      id: 2,
      image: NewZealand,
      title: "Auckland, New Zealand",
      description: "Visa . Employment . Apply",
      name: "New Zealand",
    },

    {
      id: 3,
      image: Norway,
      title: "Oslo, Norway",
      description: "Visa . Employment . Apply",
      name: "Norway",
    },

    {
      id: 4,
      image: Uk,
      title: "London, United Kingdom",
      description: "Visa . Employment . Apply",
      name: "United Kingdom",
    },

    {
      id: 5,
      image: Us,
      title: "New York, United States",
      description: "Visa . Employment . Apply",
      name: "United States",
    },

    {
      id: 6,
      image: Switzerland,
      title: "Zurich, Switzerland",
      description: "Visa . Employment . Apply",
      name: "Switzerland",
    },

    {
      id: 7,
      image: Australia,
      title: "Sydney, Australia",
      description: "Visa . Employment . Apply",
      name: "Australia",
    },

    {
      id: 8,
      image: Singapore,
      title: "Singapore, Singapore",
      description: "Visa . Employment . Apply",
      name: "Singapore",
    },

    {
      id: 9,
      image: Germany,
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
                    <Image src={destination.image} alt="" />

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
