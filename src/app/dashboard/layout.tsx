"use client";
import { ApplicationStatus } from "@/components/molecules/dashboardTabs/components/applicationStatusModal";
import VisaPaymentModal from "@/components/molecules/dashboardTabs/visaPayment";
import Spinner from "@/components/molecules/icons/spinner";
import Flex from "@/components/templates/flex";
import { useUser } from "@/lib/auth";
import getUser from "@/lib/services/dashboard/getUser";
import { useUserStore } from "@/lib/store/useStore";
import { ttColors } from "@/lib/theme/colors";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface layoutProps {
    children: React.ReactNode;
}

// export const metadata = {
//   title: "Dashboard",
//   description: "Welcome to your dashboard",
// }

export default async function DashboardLayout({ children }: layoutProps) {
    const router = useRouter();
    const { user } = useUserStore((state) => state);

    // console.log('user in the layout component of the dashboard', user);

    // if (user?.statusCode === 401 || user?.errorMessage) {
    //   return '';
    // }

    // const router = useRouter();
    // const { isLoading, user } = useUser()

    // const { user: getUser } = useUserStore((state) => state);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   if (getUser !== null && getUser?._id) {
    //     return setLoading(false);
    //   } else {
    //     setLoading(true);
    //     return router.push('/auth/login')
    //   }
    // }, [getUser]);

    // CHECK IF USER IS LOGGED LOADING STATE TO PREVENT FLASHING
    // if (loading) {
    //   return (
    //     <Flex height="450px" align="center" justify="center">
    //       <Spinner size="60px" fill={ttColors.blackishBlue} />
    //     </Flex>
    //   );
    // }

    // AUTH CHECK
    // if (isLoading === false && user.errorMessage === 'Unauthorized' && user.statusCode === 401) {
    //   return router.push('/auth/login')
    // }

    // AUTH CHECK FOR GLOBAL STATE
    useEffect(() => {
        if (!user?.firstName) {
            router.push("/auth/login");
        }
    }, [user]);

    return (
        <>
            <Navbar page="dashboard" />
            {children}
            <FooterSection />
        </>
    );
}
