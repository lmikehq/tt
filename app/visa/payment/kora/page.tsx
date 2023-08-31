"use client";
import Flex from "@atom/flex";
import Spinner from "@components/icons/spinner";
import Section from "@molecule/section";
import { useQuery } from "@tanstack/react-query";
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
    setUser(res);
    return res;
  }
  const { data: user } = useQuery(["getUser"], getUser);

  useEffect(() => {
    if (!reference) return;
    if (!user?.email) return router.push(`/?paymentRef=${reference}`);
    return router.push(`/dashboard/?paymentRef=${reference}`);
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
