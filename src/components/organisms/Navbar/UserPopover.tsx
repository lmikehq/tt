// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Link from "@atom/link";
// import Text from "@atom/text";
// import Flex from "@components/templates/flex";
// import { RxAvatar } from "react-icons/rx";
// import { IoIosArrowDown } from "react-icons/io";
// import { MouseEvent, useState } from "react";

// export default function UserPopover() {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id="basic-button"
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//       >
//         <Link href="/dashboard">
//           <Text
//             text="Dashboard"
//             type="p"
//             whiteSpace="nowrap"
//             size={16}
//             weight={400}
//           />
//         </Link>
//         <Flex
//           align="center"
//           gap=".5rem"
//           cursor="pointer"
//         >
//           <RxAvatar size={34} />
//           <IoIosArrowDown size={20} />
//           <UserPopover />
//         </Flex>
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         <MenuItem onClick={handleClose}>Settings</MenuItem>
//         <MenuItem onClick={handleClose}>Travel Guide</MenuItem>
//         <MenuItem onClick={handleClose}>Get visa</MenuItem>
//         <MenuItem onClick={handleClose}>Rent Stays</MenuItem>
//         <MenuItem onClick={handleClose}>Book Flights</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }

import Link from "@atom/link";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import { useDetectOutsideClick } from "@lib/extensions/hook/useDetectOutsideClick";
import { handleLogout } from "@lib/extensions/hook/useLogout";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import HotelIcon from "@mui/icons-material/Hotel";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import StyleIcon from "@mui/icons-material/Style";
import FeedIcon from "@mui/icons-material/Feed";
import GridViewIcon from "@mui/icons-material/GridView";
import { Span } from "@/components/molecules/stays/components/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ttColors } from "@/lib/theme/colors";
import TruncateMarkup from "react-truncate-markup";
import Button from "@/components/atoms/button";
import CheckIcon from "@mui/icons-material/Check";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { useQuery } from "@tanstack/react-query";
import apiService from "@lib/extensions/hook/apiService";
import { User } from "@lib/types";
import { useUserStore } from "@lib/store/useStore";

const CustomPopover = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    // Ref for notification modal
    const notificationRef = useRef(null);
    useDetectOutsideClick(notificationRef, () =>
        setIsNotificationVisible(false)
    );

    // Ref for "More" dropdown
    const moreRef = useRef(null);
    useDetectOutsideClick(moreRef, () => setIsMoreVisible(false));

    // Ref for "Visible" dropdown
    const visibleRef = useRef(null);
    useDetectOutsideClick(visibleRef, () => setIsVisible(false));

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isMoreVisible, setIsMoreVisible] = useState(false);

    const notifications = [
        {
            name: "admin",
        },
        {
            name: "admin",
        },
        {
            name: "admin",
        },
        {
            name: "admin",
        },
        {
            name: "admin",
        },
    ];

    const { setUser } = useUserStore((state) => state);
    async function getUser(): Promise<User | any> {
        const res = await apiService("/user", "GET");
        setUser(res);
        return res;
    }

    const { data: user } = useQuery(["getUser"], getUser);

    return (
        <>
            <Span
                className="user_popover"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Span>
                    <NotificationsIcon
                        onClick={() =>
                            setIsNotificationVisible(!isNotificationVisible)
                        }
                        style={{ cursor: "pointer" }}
                    />
                    {isNotificationVisible && (
                        <div
                            style={{
                                position: "absolute",
                                width: "350px",
                                backgroundColor: "#fafafa",
                                border: "1px solid #ccc",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                borderRadius: "5px",
                                padding: "20px",
                                zIndex: 1,
                                top: "55px",
                                right: "30px",
                            }}
                            ref={notificationRef}
                        >
                            <Span>
                                <Span className="header">
                                    <Flex justify="space-between">
                                        <Span>
                                            <Text
                                                weight={600}
                                                type="h3"
                                                text="Notifications"
                                            ></Text>
                                        </Span>
                                        <Span
                                            style={{
                                                padding: "1px 3px",
                                                cursor: "pointer",
                                                border: "1px solid var(--text-gray-color)",
                                            }}
                                        >
                                            <MoreHorizIcon
                                                onClick={() =>
                                                    setIsMoreVisible(
                                                        !isMoreVisible
                                                    )
                                                }
                                                style={{
                                                    position: "relative",
                                                    top: "2px",
                                                }}
                                            />
                                        </Span>{" "}
                                        {isMoreVisible && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    width: "200px",
                                                    backgroundColor: "#fafafa",
                                                    border: "1px solid #ccc",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.15)",
                                                    borderRadius: "5px",
                                                    padding: "10px",
                                                    zIndex: 1,
                                                    top: "55px",
                                                    right: "0",
                                                }}
                                                ref={moreRef}
                                            >
                                                <Flex
                                                    direction="column"
                                                    gap="10px"
                                                >
                                                    <Flex
                                                        className="user_drop_list"
                                                        cursor="pointer"
                                                        align="center"
                                                        gap="8px"
                                                    >
                                                        <CheckIcon
                                                            style={{
                                                                fontSize:
                                                                    "18px",
                                                            }}
                                                        />
                                                        <Text
                                                            type="p"
                                                            text="Mark all as read"
                                                        ></Text>
                                                    </Flex>
                                                    <Flex
                                                        className="user_drop_list"
                                                        cursor="pointer"
                                                        align="center"
                                                        gap="8px"
                                                    >
                                                        <CleaningServicesIcon
                                                            style={{
                                                                fontSize:
                                                                    "18px",
                                                            }}
                                                        />
                                                        <Flex>
                                                            <Text
                                                                whiteSpace="nowrap"
                                                                type="p"
                                                                text="Clear Notifications"
                                                            ></Text>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </div>
                                        )}
                                    </Flex>
                                    <Flex
                                        margin="5px 0px"
                                        styles={{ marginTop: "10px" }}
                                    >
                                        <Text
                                            weight={500}
                                            type="p"
                                            text="Today"
                                        ></Text>
                                    </Flex>
                                </Span>
                                {notifications.map((item, index) => (
                                    <Span
                                        className="not_list"
                                        key={index}
                                        style={{ padding: "8px 0px" }}
                                    >
                                        <Flex align="center" gap="8px">
                                            <Flex
                                                styles={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "50%",
                                                    }}
                                                    src="/assets/images/stays/admin.png"
                                                    alt="admin"
                                                />
                                            </Flex>
                                            <Flex align="center" gap="6px">
                                                <Span>
                                                    <Text
                                                        color={
                                                            ttColors.primary600
                                                        }
                                                        type="h4"
                                                        weight={500}
                                                        whiteSpace="nowrap"
                                                        text="Admin"
                                                    ></Text>
                                                </Span>

                                                <Span
                                                    style={{ width: "100px" }}
                                                >
                                                    <TruncateMarkup lines={1}>
                                                        <p
                                                            style={{
                                                                color: "var(--text-gray-color)",
                                                            }}
                                                        >
                                                            requested Bio Metric
                                                            document
                                                        </p>
                                                    </TruncateMarkup>
                                                </Span>
                                            </Flex>
                                            <Flex align="center">
                                                <FiberManualRecordIcon
                                                    style={{
                                                        color: ttColors.primary600,
                                                        fontSize: "16px",
                                                    }}
                                                />
                                                <Text
                                                    color="var(--text-gray-color)"
                                                    type="p"
                                                    text="20mins"
                                                ></Text>
                                            </Flex>
                                        </Flex>
                                    </Span>
                                ))}
                                <Span className="btn">
                                    <Button
                                        background={ttColors.dark}
                                        color={ttColors.light}
                                        border={`1px solid ${ttColors.dark}`}
                                        padding="5px 10px"
                                        width="100%"
                                        onClick={() => {
                                            router.push("/dashboard");
                                        }}
                                        styles={{
                                            background:
                                                "transparent !important",
                                        }}
                                    >
                                        <Text
                                            type="p"
                                            weight={"bold"}
                                            size={15}
                                            text="See All Notification"
                                        ></Text>
                                    </Button>
                                </Span>
                            </Span>
                        </div>
                    )}
                </Span>

                <Flex
                    align="center"
                    gap=".5rem"
                    styles={{
                        position: "relative",
                    }}
                >
                    <Flex
                        align="center"
                        gap="5px"
                        cursor="pointer"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {user && user.avatar ? (
                            <img src={user.image} alt="" />
                        ) : (
                            <RxAvatar size={38} />
                        )}
                        <Flex direction="column">
                            <Text
                                whiteSpace="nowrap"
                                type="p"
                                size={14}
                                text={`${user?.lastName} ${user?.firstName}`}
                            ></Text>
                            <Text
                                type="p"
                                size={13}
                                text={`${user?.email}`}
                            ></Text>
                        </Flex>
                        <IoIosArrowDown size={20} />
                    </Flex>
                    {isVisible && (
                        <div
                            style={{
                                position: "absolute",
                                width: "250px",
                                backgroundColor: "#fafafa",
                                border: "1px solid #ccc",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                borderRadius: "5px",
                                padding: "10px",
                                zIndex: 1,
                                top: "40px",
                                right: "0",
                            }}
                            ref={visibleRef}
                        >
                            {[
                                {
                                    title: "Dashboard",
                                    icon: <GridViewIcon />,
                                    url: "/dashboard",
                                },
                                {
                                    title: "Travel Guide",
                                    icon: <FeedIcon />,
                                    url: "/chat",
                                },
                                {
                                    title: "Get visa",
                                    icon: <StyleIcon />,
                                    url: "/visa",
                                },
                                {
                                    title: "Rent Stay",
                                    icon: <HotelIcon />,
                                    url: "/stay",
                                },
                                {
                                    title: "Get Ticket",
                                    icon: <AirplaneTicketIcon />,
                                    url: "/flight",
                                },
                                {
                                    title: "Logout",
                                    icon: <LogoutIcon />,
                                    url: "/logout",
                                },
                            ].map((item, i) =>
                                item.title === "Logout" ? (
                                    <div
                                        onClick={() => {
                                            handleLogout();
                                            router.push("/auth/login");
                                        }}
                                        key={i}
                                        style={{ margin: "15px 0px" }}
                                    >
                                        <Flex
                                            align="center"
                                            gap="10px"
                                            className="user_drop_list"
                                            styles={{
                                                cursor: "pointer",
                                                width: "100%",
                                            }}
                                        >
                                            <span>{item.icon}</span>
                                            <Text
                                                text={item.title}
                                                type="p"
                                                whiteSpace="nowrap"
                                                size={16}
                                                weight={400}
                                                decoration="none"
                                            />
                                        </Flex>
                                    </div>
                                ) : (
                                    <div key={i} style={{ margin: "15px 0px" }}>
                                        <Link href={item.url}>
                                            <Flex
                                                align="center"
                                                gap="10px"
                                                className="user_drop_list"
                                            >
                                                <span>{item.icon}</span>
                                                <Text
                                                    text={item.title}
                                                    type="p"
                                                    whiteSpace="nowrap"
                                                    size={16}
                                                    weight={400}
                                                    decoration="none"
                                                />
                                            </Flex>
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </Flex>
            </Span>
        </>
    );
};

export default CustomPopover;
