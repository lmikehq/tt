"use client";
import styled from "styled-components";
import Text from "@atom/text";
import { Grid } from "@atom/grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import ReviewLayout from "@layout/sectionLayout";
import VisaImg from "@image/serviceCard/visas.png";
import FlightImg from "@image/serviceCard/flight.png";
import HotelImg from "@image/serviceCard/hotel.png";
import TravelImg from "@image/serviceCard/travel.png";

const ReviewWrapper = styled.div``;
const ServiceCard = styled.div``;

const Review = () => {
  return (
    <ReviewWrapper>
      <ReviewLayout>
        <Grid columns="repeat(2, 1fr)" gap="2rem">
          <ServiceCard>
            <Image src={VisaImg} width={100} height={100} alt="" />
            <div className="reviewInfo">
              <Text type="h3" text="Visas" />
              <Text
                type="p"
                text="Search Flights & Places Hire to our most popular destinations"
              />
              <Button />
            </div>
          </ServiceCard>
          <ServiceCard>
            <Image src={FlightImg} width={100} height={100} alt="" />
            <div className="reviewInfo">
              <Text type="h3" text="Flights" />
              <Text
                type="p"
                text="Search Flights & Places Hire to our most popular destinations"
              />
              <Button />
            </div>
          </ServiceCard>
          <ServiceCard>
            <Image src={TravelImg} width={100} height={100} alt="" />
            <div className="reviewInfo">
              <Text type="h3" text="Travel Guide" />
              <Text
                type="p"
                text="Search Flights & Places Hire to our most popular destinations"
              />
              <Button />
            </div>
          </ServiceCard>
          <ServiceCard>
            <Image src={HotelImg} width={100} height={100} alt="" />
            <div className="reviewInfo">
              <Text type="h3" text="Hotels" />
              <Text
                type="p"
                text="Search Flights & Places Hire to our most popular destinations"
              />
              <Button />
            </div>
          </ServiceCard>
        </Grid>
      </ReviewLayout>
    </ReviewWrapper>
  );
};

export default Review;
