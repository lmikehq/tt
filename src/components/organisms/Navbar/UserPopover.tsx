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
import { useNotificationStore } from "@/lib/store/notification.store";
import { NotificationProps } from "@/lib/types/response-models/dashboard";
import { NotificationService } from "@/lib/services/dashboard/notification.service";
import toast from "react-hot-toast";
import Section from "@/components/molecules/section";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import Image from "@/components/atoms/image";
import NoficationBellIcon from 'public/assets/icons/dashboard/no-notification-bell.svg';
import { AuthUser } from "@/lib/types/response-models/auth/auth.type";
import Spinner from "@/components/molecules/icons/spinner";
import { RefetchProp } from "types";

interface Props {
  user: AuthUser;
  isLoading: boolean;
  refetch: RefetchProp;
}

const CustomPopover = ({ user, isLoading, refetch }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { notifications, resetNotifications } = useNotificationStore((state) => state);
  const { updateTab, setTab } = useDashboardStore((state) => state);

  // Ref for notification modal
  const notificationRef = useRef(null);
  useDetectOutsideClick(notificationRef, () => setIsNotificationVisible(false));

  // Ref for "More" dropdown
  const moreRef = useRef(null);
  useDetectOutsideClick(moreRef, () => setIsMoreVisible(false));

  // Ref for "Visible" dropdown
  const visibleRef = useRef(null);
  useDetectOutsideClick(visibleRef, () => setIsVisible(false));

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isMoreVisible, setIsMoreVisible] = useState(false);


  const { setUser } = useUserStore((state) => state);
  async function getUser(): Promise<User | any> {
    const res = await apiService("/user", "GET");
    setUser(res);
    return res;
  }

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
            onClick={() => setIsNotificationVisible(!isNotificationVisible)}
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
                      <Text weight={600} type="h3" text="Notifications"></Text>
                    </Span>
                    <Span
                      style={{
                        padding: "1px 3px",
                        cursor: "pointer",
                        border: "1px solid var(--text-gray-color)",
                      }}
                    >
                      <MoreHorizIcon
                        onClick={() => setIsMoreVisible(!isMoreVisible)}
                        style={{ position: "relative", top: "2px" }}
                      />
                    </Span>{" "}
                    {isMoreVisible && (
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
                          top: "55px",
                          right: "0",
                        }}
                        ref={moreRef}
                      >
                        <Flex direction="column" gap="10px">
                          <Flex
                            className="user_drop_list"
                            cursor="pointer"
                            align="center"
                            gap="8px"
                            onClick={async () => {
                              const response = await NotificationService.markAllNotification();
                              if (response.success === true || response.message === 'all user notifications read') {
                                toast.success('Notifications Read');
                              }
                            }}
                          >
                            <CheckIcon style={{ fontSize: "18px" }} />
                            <Text type="p" text="Mark all as read"></Text>
                          </Flex>
                          <Flex
                            className="user_drop_list"
                            cursor="pointer"
                            align="center"
                            gap="8px"
                            onClick={() => resetNotifications()}
                          >
                            <CleaningServicesIcon
                              style={{ fontSize: "18px" }}
                            />
                            <Flex>
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
                          </Flex>
                        </Flex>
                      </div>
                    )}
                  </Flex>
                  <Flex margin="5px 0px" styles={{ marginTop: "10px" }}>
                    <Text weight={500} type="p" text="Today"></Text>
                  </Flex>
                </Span>

                <Section margin="20px 0">
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification: NotificationProps, index) => (
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
                                  color={ttColors.primary600}
                                  type="h4"
                                  weight={500}
                                  whiteSpace="nowrap"
                                  text="Admin"
                                ></Text>
                              </Span>

                              <Span style={{ width: "100px" }}>
                                <TruncateMarkup lines={1}>
                                  <p style={{ color: "var(--text-gray-color)" }}>
                                    {notification?.message}
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
                    </>
                  ) : (
                    <Flex align="center" direction="column" gap="12px" justify="center">
                      {/* <NotificationsIcon /> */}
                      <Image src={NoficationBellIcon} alt="notification-icon" height={50} width={50} />
                      <Text type="p" text="No Notification" />
                    </Flex>
                  )}
                </Section>

                <Span className="btn">
                  <Button
                    background={ttColors.dark}
                    color={ttColors.light}
                    border={`1px solid ${ttColors.dark}`}
                    padding="5px 10px"
                    width="100%"
                    onClick={() => {
                      // router.push("/dashboard");
                      setTab(3);
                      // updateTab('Notifications');
                    }}
                    styles={{ background: "transparent !important" }}
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
          {isLoading ? (
            <Flex>
              <Spinner size="40px" fill={ttColors.blackishBlue} />
            </Flex>
          ) : (
            <Flex
              align="center"
              gap="5px"
              cursor="pointer"
              onClick={() => setIsVisible(!isVisible)}
            >
              {user && user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="user-profile"
                  height={54}
                  width={54}
                  style={{ borderRadius: '100%', objectFit: 'contain', height: "54px", width: "54px", maxWidth: "54px", maxHeight: "54px", border: "2px solid var(--Slamon, #FF8682)" }}
                />
              ) : (
                <RxAvatar size={48} />
              )}
              <Flex direction="column">
                <Text
                  whiteSpace="nowrap"
                  type="p"
                  size={18}
                  weight={600}
                  text={`${user?.firstName} ${user?.lastName}`}
                ></Text>
                <Text type="p" size={13} text={`${user?.email}`} color={'#333'}></Text>
              </Flex>
              <IoIosArrowDown size={20} />
            </Flex>
          )}

          {isVisible && (
            <div
              style={{
                position: "absolute",
                width: "308px",
                maxWidth: "308px",
                backgroundColor: "#fafafa",
                border: "1px solid #ccc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "12px",
                padding: "15px",
                zIndex: 1,
                top: "55px",
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
                  title: "Book Flight",
                  icon: <AirplaneTicketIcon />,
                  url: "/flight",
                },
                {
                  title: "Logout",
                  icon: <LogoutIcon />,
                  url: "/logout",
                },
              ].map((item, i, arr) =>
                item.title === "Logout" ? (
                  <div
                    onClick={() => {
                      handleLogout()
                        .then(res => {
                          setUser(null);
                          refetch();
                          window && window.localStorage.removeItem('user');
                        });
                      router.push("/auth/login");
                    }}
                    key={i}
                  // style={{ margin: i === 0 ? "0px 0px 0" : i === arr.length - 1 ? "0px 0px 15px" : "15px 0px" }}
                  >
                    <Flex
                      align="center"
                      gap="10px"
                      className="user_drop_list"
                      padding="12px 10px"
                      styles={{ cursor: "pointer", width: "100%" }}
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
                  <div key={i}>
                    <Link href={item.url}>
                      <Flex
                        align="center"
                        gap="10px"
                        className="user_drop_list"
                        padding="12px 10px"
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
