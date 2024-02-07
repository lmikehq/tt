import VisaDashboardHeader from "./visaDashboardHeader";
import styled from "styled-components";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Section from "@molecule/section";
import { Grid } from "@components/templates/grid";
import Flex from "@components/templates/flex";
import FavouritesCard from "./favourites/favouriteCard";
import Center from "@/components/templates/center";
import NoApplication from "./noApplication";
import NoFavImg from 'public/assets/icons/dashboard/no-favourites.svg';
import { useFavouriteDashboard } from "@/lib/hooks/dashboard/favourite.hook";
// import { mockUserDashboardLikes } from "@/lib/extensions/data/mock";
import PaginationCtrl from "../../pagination";
import { HotelRoomFavourite } from "@/lib/types/response-models/dashboard";
import Spinner from "../../icons/spinner";
import { ttColors } from "@/lib/theme/colors";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";

const FavouriteWrapper = styled.div``;


const Favourite = () => {
  const { isMobile } = useScreenResolution();
  const { page, setPage, limit } = useDashboardStore((state) => state);

  const content = {
    title: "You've got no favorite - Let's help you get Started",
    links: [
      { text: "Apply for Visa", url: "/apply/visa" },
      { text: "Book flight", url: "/flight" },
    ],
  };

  const { data, isLoading } = useFavouriteDashboard({ query: { currentPage: page, limit }, options: { retry: 2 } });

  const response = data as { favourites: HotelRoomFavourite[], filteredCount: number, totalCount: number; };

  const favourites: HotelRoomFavourite[] = data as HotelRoomFavourite[];
  // const favourites: HotelRoomFavourite[] = response.favourites || []
  // const filteredCount: number = response?.filteredCount || 1;
  // const totalCount: number = response?.totalCount || 1;

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
              {/* <PaginationCtrl data={[]} page={page} setPage={setPage} filteredCount={filteredCount} totalCount={totalCount} /> */}
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
