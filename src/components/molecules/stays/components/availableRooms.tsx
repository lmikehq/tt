import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import MidListFilter from "./MidListFilter";
import SortedRoomsTab from "./SortedRoomsTab";
import RoomBox from "./roomsBox";
import RoomSlider from "./roomSlider";


interface Room {
    name: string;
    location: string;
    distance: string;
    reviews: number;
    rating: number;
    price: number;
    image: string;
    images: string[]; // An array of image paths for the room
}
const rooms: Room[] = [
    {
        name: "The Ritz London",
        location: "City Center",
        distance: "0.5 miles",
        reviews: 10,
        rating: 3,
        price: 81000,
        image: "/assets/images/stays/image1.jpg",
        images: [
            "/assets/images/stays/room1.jpeg",
            "/assets/images/stays/image2.jpg",
            "/assets/images/stays/image3.png",
            "/assets/images/stays/room4.jpg",
        ],
    },
    {
        name: "The Ritz London",
        location: "Suburb Area",
        distance: "1 mile",
        reviews: 15,
        rating: 4.8,
        price: 81000,
        image: "/assets/images/stays/room2.jpeg",
        images: [
            "/assets/images/stays/room1.jpeg",
            "/assets/images/stays/image2.jpg",
            "/assets/images/stays/image3.png",
            "/assets/images/stays/room4.jpg",
        ],
    },
    {
        name: "The Ritz London",
        location: "Downtown",
        distance: "0.3 miles",
        reviews: 8,
        rating: 4.2,
        price: 81000,
        image: "/assets/images/stays/room3.jpg",
        images: [
            "/assets/images/stays/room1.jpeg",
            "/assets/images/stays/image2.jpg",
            "/assets/images/stays/image3.png",
            "/assets/images/stays/room4.jpg",
        ],
    },
    {
        name: "The Ritz London",
        location: "Downtown",
        distance: "0.3 miles",
        reviews: 8,
        rating: 4.2,
        price: 81000,
        image: "/assets/images/stays/room3.jpg",
        images: [
            "/assets/images/stays/room1.jpeg",
            "/assets/images/stays/image2.jpg",
            "/assets/images/stays/image3.png",
            "/assets/images/stays/room4.jpg",
        ],
    },
    {
        name: "The Ritz London",
        location: "Downtown",
        distance: "0.3 miles",
        reviews: 8,
        rating: 4.2,
        price: 81000,
        image: "/assets/images/stays/room3.jpg",
        images: [
            "/assets/images/stays/room1.jpeg",
            "/assets/images/stays/image2.jpg",
            "/assets/images/stays/image3.png",
            "/assets/images/stays/room4.jpg",
        ],
    },
    {
        name: "The Ritz London",
        location: "Downtown",
        distance: "0.3 miles",
        reviews: 8,
        rating: 4.2,
        price: 81000,
        image: "/assets/images/stays/room3.jpg",
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
            {rooms?.slice(0, 4).map((room, index) => (
                <RoomBox room={room} index={index} key={index} />
            ))}
            <MidListFilter
                sortType={sortType}
                ratings={1}
                prices={1}
                setSortType={setSortType}
            />
            <RoomSlider rooms={rooms} />
            {rooms?.slice(4).map((room, index) => (
                <RoomBox room={room} index={index} key={index} />
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
