import VisaDashboardHeader from "./visaDashboardHeader";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Section from "@molecule/section";
import { Grid } from "@components/templates/grid";
import Image from "@atom/image";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import FavouritesCard from "./favourites/favouriteCard";
import Center from "@/components/templates/center";
import NoApplication from "./noApplication";
import NoFavImg from 'public/assets/icons/dashboard/no-favourites.svg';
import { useFavouriteDashboard } from "@/lib/hooks/dashboard/favourite.hook";
import { mockUserDashboardLikes } from "@/lib/extensions/data/mock";
import withLikeHotel from "@/components/HOCs/withLikeHotel";
import PaginationCtrl from "../../pagination";
import { HotelRoomFavourite } from "@/lib/types/response-models/dashboard";

const FavouriteWrapper = styled.div``;


const Favourite = () => {
  const { isMobile } = useScreenResolution();

  const content = {
    title: "You've got no favorite - Let's help you get Started",
    links: [
      { text: "Apply for Visa", url: "/apply/visa" },
      { text: "Book flight", url: "/flight" },
    ],
  };

  ;

  const { data, isLoading } = useFavouriteDashboard({ query: '', options: { retry: 2 } });
  console.log({ mockUserDashboardLikes });

  const favourites: HotelRoomFavourite[] = data as HotelRoomFavourite && [];

  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "20px",
        padding: ".5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Favourites" type="radio" />
      {/* NO-FAVOURITE COMPONENT */}

      {/* <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
        <NoApplication noVisaImage={NoFavImg} content={content} />
      </Center> */}

      {/* FAVOURITE COMPONENT */}
      <FavouriteWrapper>
        <Grid columns={isMobile ? "1" : "3"} gap={isMobile ? "1.5rem" : "1rem"} style={{ rowGap: '56px', justifyItems: 'center' }}>
          {new Array(4).fill(2).map((_key, index) => {
            return (
              <FavouritesCard
                key={mockUserDashboardLikes._id}
                image={mockUserDashboardLikes.images[0]}
                name={mockUserDashboardLikes.name}
                countryName={mockUserDashboardLikes.region.name}
                price={Number(mockUserDashboardLikes.rates[0].daily_prices[0])}
              />
            );
          })}
        </Grid>
      </FavouriteWrapper>

      {favourites?.length > 20 ? (
        <PaginationCtrl data={[]} page={1} setPage={() => { }} />
      ) : null}

    </Section>
  );
};

export default Favourite;
