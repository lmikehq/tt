'use client';
import DashboardHeader from "src/components/molecules/dashboardTabs/dashboard";
import UserStoreProvider from "@lib/extensions/hook/useUserStore";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import { ApplicationStatus } from "@/components/molecules/dashboardTabs/components/applicationStatusModal";
import VisaPaymentModal from "@/components/molecules/dashboardTabs/visaPayment";
import { useNotificationStore } from "@/lib/store/notification.store";
import toast from "react-hot-toast";
import { fetchEventSource } from "@microsoft/fetch-event-source";


const DashboardHeaderComponent = () => {
  const [documentModal, setDocumentModal] = useState(true);
  const [paymentModal, setPaymentModal] = useState(false);
  const { queryParams } = useDashboardStore(state => state);
  const { setNotification } = useNotificationStore((state) => state);

  // EVENT LISTENER
  const ctrl = new AbortController();


  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    let sse;

    const fetchData = async () => {
      try {
        sse = await fetchEventSource(process.env.NEXT_PUBLIC_NOTIFICATION_EVENT_URL as string, {
          method: 'GET',
          headers: {
            // 'Content-Type': 'text/event-stream',
            // 'Cache-Control': 'no-cache'
          },
          signal: ctrl.signal,
          openWhenHidden: true,
          credentials: 'include',
          onmessage(data) {
            if (data.data.length > 1) {
              setNotification([data.data]);
              toast.success('Notification Received');
              ctrl.signal;
            }
          },
          onclose() {
            ctrl.abort();
          },
          onerror(error) {
            retryCount++;
            if (retryCount < maxRetries) {

              setTimeout(() => {
                fetchData();
              }, 1000 * Math.pow(2, retryCount));
            } else {

              ctrl.abort();
              toast.error('Failed to fetch data after multiple attempts');
            }
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      ctrl.abort();
    };
  }, []);
  // EVENT LISTENER

  return (
    <UserStoreProvider>
      <DashboardHeader />
      {documentModal && (
        <ApplicationStatus
          state={documentModal}
          setState={setDocumentModal}
          openPaymentModal={setPaymentModal}
        />
      )}
      {paymentModal && (
        <VisaPaymentModal
          open={paymentModal}
          onClose={() => setPaymentModal(false)}
          visaDetails={{
            id: '1',
            intent: 'FORM FEE',
            accompanying: 0,
            refetch: () => { }
          }}
        />
      )}
    </UserStoreProvider>
  );
};

export default DashboardHeaderComponent;
