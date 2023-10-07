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
//         <MenuItem onClick={handleClose}>Book Visa</MenuItem>
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

const CustomPopover = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const ref = useRef(null);
  useDetectOutsideClick(ref, () => setIsVisible(false));
  return (
    <>
      <Flex align="center" gap="1rem">
        <Link href="/dashboard">
          <Text
            text="Dashboard"
            type="p"
            whiteSpace="nowrap"
            size={16}
            weight={400}
          />
        </Link>
        <Flex
          align="center"
          gap=".5rem"
          cursor="pointer"
          styles={{
            position: "relative",
          }}
        >
          <RxAvatar size={34} />
          <IoIosArrowDown size={20} onClick={() => setIsVisible(!isVisible)} />
          {isVisible && (
            <div
              style={{
                position: "absolute",
                width: "200px",
                backgroundColor: "#fafafa",
                border: "1px solid #ccc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1,
                top: "40px",
                right: "0",
              }}
              ref={ref}
            >
              {[
                { title: "Settings", url: "/dashboard" },
                { title: "Travel Guide", url: "/chat" },
                { title: "Book Visa", url: "/visa" },
                { title: "Rent Stay", url: "/stay" },
                { title: "Book Flight", url: "/flight" },
                { title: "Logout", url: "/logout" },
              ].map((item, i) =>
                item.title === "Logout" ? (
                  <div
                    onClick={() => {
                      handleLogout();
                      router.push("/auth/login");
                    }}
                    key={i}
                  >
                    <Text
                      text={item.title}
                      type="p"
                      whiteSpace="nowrap"
                      size={16}
                      weight={400}
                      decoration="underline"
                      margin=".5rem 0"
                    />
                  </div>
                ) : (
                  <Link href={item.url} key={i}>
                    <Text
                      text={item.title}
                      type="p"
                      whiteSpace="nowrap"
                      size={16}
                      weight={400}
                      decoration="underline"
                      margin=".5rem 0"
                    />
                  </Link>
                )
              )}
            </div>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default CustomPopover;
