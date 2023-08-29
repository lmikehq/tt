"use client";
import Flex from "@atom/flex";
import Spinner from "@components/icons/spinner";
import Section from "@molecule/section";
import apiService from "hook/apiService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ttColors } from "theme/colors";

const VerifyKoraPaymentPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const reference = params.get("reference");
  const verifyKoraPayment = async () => {
    return apiService(`/payment/${reference}/status`);
  };
  useEffect(() => {
    if (!reference) return;
    console.log("reference", reference);
    verifyKoraPayment().then((res) => {
      // router.push(`visa/apply/?application=${res.status}`);
      console.log('ress: ', res)
    });
  });
  return (
    <Section height="100vh" width="100%">
      <Flex width="100%" height="100%" align="center" justify="center">
        <Spinner size="50" fill={ttColors.primary} />
      </Flex>
    </Section>
  );
};

export default VerifyKoraPaymentPage;
