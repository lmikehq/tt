import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import SortedRoomsTab from "./sortedRoomsTab";
import MidListFilter from "./midListFilter";
import RoomSlider from "./roomSlider";
import RoomBox from "./roomsBox";

interface Hotel {
  name: string;
  address: string;
  distance: string;
  reviews: number;
  star_rating: number;
  price: number;
  images: string[]; // An array of image paths for the Hotel
}
const hotels: Hotel[] = [
  {
    name: "The Ritz London",
    address: "City Center",
    distance: "0.5 miles",
    reviews: 10,
    star_rating: 3,
    price: 81000,

    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    address: "Suburb Area",
    distance: "1 mile",
    reviews: 15,
    star_rating: 4.8,
    price: 81000,

    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    address: "Downtown",
    distance: "0.3 miles",
    reviews: 8,
    star_rating: 4.2,
    price: 81000,

    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    address: "Downtown",
    distance: "0.3 miles",
    reviews: 8,
    star_rating: 4.2,
    price: 81000,

    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    address: "Downtown",
    distance: "0.3 miles",
    reviews: 8,
    star_rating: 4.2,
    price: 81000,

    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    address: "Downtown",
    distance: "0.3 miles",
    reviews: 8,
    star_rating: 4.2,
    price: 81000,

    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
];

function AvailableRooms() {
  const { isMobile } = useScreenResolution();

  const router = useRouter();

  const [sortType, setSortType] = useState("best");

  return (
    <div>
      {!isMobile && (
        <SortedRoomsTab
          bestPrice={1}
          topReviews={1}
          lowestPrice={1}
          starRatings={1}
          distance={"s"}
          sortType={sortType}
          setSortType={setSortType}
        />
      )}
      {hotels?.slice(0, 4).map((hotel, index) => (
        <RoomBox hotel={hotel} index={index} key={index} />
      ))}
      <MidListFilter
        sortType={sortType}
        ratings={1}
        prices={1}
        setSortType={setSortType}
      />
      <RoomSlider hotels={hotels} />
      {hotels?.slice(4).map((hotel, index) => (
        <RoomBox hotel={hotel} index={index} key={index} />
      ))}
      <Flex justify="center" styles={{ marginTop: "40px" }}>
        <span className="pagination">
          <Pagination
            className="paginationItemStyle"
            count={10}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </span>
      </Flex>
    </div>
  );
}

export default AvailableRooms;
