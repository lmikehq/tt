"use client";
import Flex from "@components/templates/flex";
import Spinner from "src/components/icons/spinner";
import Section from "src/components/molecules/section";
import apiService from "hook/apiService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "store/useStore";
import { ttColors } from "theme/colors";
import { User } from "types";

const VerifyKoraPaymentPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const reference = params.get("reference");
  // const verifyKoraPayment = async () => {
  //   return apiService(`/payment/${reference}/status`);
  // };
  // useEffect(() => {
  //   if (!reference) return;
  //   verifyKoraPayment().then((res) => {
  //     router.push(`/visa/apply/?status=${res.status}`);
  //   });
  // });
  const { setUser } = useUserStore((state) => state);

  async function getUser(): Promise<User | any> {
    const res = await apiService("/user", "GET");
    if (res?.email && res?._id) {
      setUser(res);
      return router.push(`/dashboard/?paymentRef=${reference}`);
    }
    return router.push(`/?paymentRef=${reference}`);
  }

  useEffect(() => {
    if (!reference) return;
    getUser();
  }, [reference]);
  return (
    <Section height="100vh" width="100%">
      <Flex width="100%" height="100%" align="center" justify="center">
        <Spinner size="50" fill={ttColors.primary} />
      </Flex>
    </Section>
  );
};

export default VerifyKoraPaymentPage;
