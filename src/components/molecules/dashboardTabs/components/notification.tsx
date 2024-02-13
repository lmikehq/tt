import Flex from "@components/templates/flex";
import NotificationItem from "@molecule/notificationItem";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import VisaDashboardHeader from "./visaDashboardHeader";
import Center from "@/components/templates/center";
import NoApplication from "./noApplication";
import NoficationBellIcon from 'public/assets/icons/dashboard/no-notification-bell.svg';
import { useDashboardNotification } from "@/lib/hooks/dashboard/notification.hook";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import Spinner from "../../icons/spinner";
import { NotificationProps } from "@/lib/types/response-models/dashboard";
import { format } from "date-fns";
import PaginationCtrl from "../../pagination";
import CustomPagination from "../../pagination/customPagination";
import useHandlePagination from "@/lib/extensions/hook/useHandlePagination";


const NotificationWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const Notification = () => {
  const { isMobile } = useScreenResolution();
  const { param, limit, page, startDate, endDate, setPage } = useDashboardStore((state) => state);
  // HANDLE PAGINATION
  const { onPageChange } = useHandlePagination();
  const content = {
    title: "You've got no Notification - Please come back later.",
    links: []
  };

  const { data, isLoading, refetch } = useDashboardNotification({
    query: { status: param, limit, currentPage: page, startDate, endDate },
    options: { retry: 2 }
  });

  const response = data as { notifications: NotificationProps[], filteredCount: number, totalCount: number; };

  const notifications: NotificationProps[] = data as NotificationProps[];
  // const notifications: NotificationProps[] = response.notifications || []
  const filteredCount: number = response?.filteredCount || 1;
  const totalCount: number = response?.totalCount || 1;

  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: ".25rem 1.5rem 3rem",
      }}
    >
      <VisaDashboardHeader headerText="Notifications" type="radio" />

      <NotificationWrapper>
        {isLoading ? (
          <Flex height="450px" align="center" justify="center">
            <Spinner size="60px" fill={ttColors.blackishBlue} />
          </Flex>
        ) : (
          <Flex direction="column" gap="1rem">
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification: NotificationProps) => {
                  return (
                    <NotificationItem
                      key={notification._id}
                      src={"/assets/images/notification/notice1.png"}
                      title={notification.message}
                      date={format(new Date(notification.updatedAt), 'dd-MM-yyyy')}
                      time={format(new Date(notification.updatedAt), 'hh: mm:ss a')}
                      showDot={notification.status === 'UNREAD' ? true : false}
                      id={notification._id}
                    />
                  );

                })}
                {/* <PaginationCtrl<NotificationProps> page={page} setPage={setPage} data={notifications} filteredCount={filteredCount} totalCount={totalCount} /> */}
                <Flex justify="flex-end" align="center">
                  <CustomPagination count={Math.ceil(filteredCount / limit)} onChange={onPageChange} page={page} />
                </Flex>
              </>

            ) : (
              <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
                <NoApplication noVisaImage={NoficationBellIcon} content={content} />
              </Center>
            )}
          </Flex>
        )}
      </NotificationWrapper>
    </Section>
  );
};

export default Notification;
