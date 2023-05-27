"use client";

import styled from "styled-components";
import DestinationLayout from "@layout/sectionLayout";
import Link from "@atom/link";
import Flex from "@atom/flex";
import {Grid} from "@atom/grid";
import Image from "next/image";
import CountryFlag from "./countryFlags";

const DestinationWrapper = styled.div``;
const Card = styled.div``;

const Destination = () => {
  return (
    <DestinationWrapper>
      <DestinationLayout>
        <Link href="/">
            <Card>
                <Grid columns="repeat(2, 30% 70%)">
                    <Image src={CountryFlag} alt=""/>
                    <Flex>

                    </Flex>
                </Grid>
            </Card>
        </Link>
      </DestinationLayout>
    </DestinationWrapper>
  );
};
