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
import Spinner from "../../icons/spinner";
import { ttColors } from "@/lib/theme/colors";

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

  const { data, isLoading } = useFavouriteDashboard({ query: '', options: { retry: 2 } });

  const favourites: HotelRoomFavourite[] = data as HotelRoomFavourite[];

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

      {isLoading ? (
        <Flex height="450px" align="center" justify="center">
          <Spinner size="60px" fill={ttColors.blackishBlue} />
        </Flex>
      ) : (
        <>
          {/* FAVOURITE COMPONENT */}
          {favourites.length > 0 ? (
            <FavouriteWrapper>
              <Grid columns={isMobile ? "1" : "3"} gap={isMobile ? "1.5rem" : "1rem"} style={{ rowGap: '56px', justifyItems: 'center' }} margin="0 0 40px">
                {favourites.map((favourite, index) => {
                  return (
                    <FavouritesCard
                      key={favourite._id}
                      hotelId={favourite.id}
                      image={favourite.images[0]}
                      name={favourite.name}
                      countryName={favourite.region.name}
                      price={Number(favourite.rates[0].daily_prices[0])}
                    />
                  );
                })}
              </Grid>
              <PaginationCtrl data={[]} page={1} setPage={() => { }} />
            </FavouriteWrapper>
          ) : (
            <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
              <NoApplication noVisaImage={NoFavImg} content={content} />
            </Center>
          )}
        </>
      )}
    </Section >
  );
};

export default Favourite;
