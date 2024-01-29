import Center from "@components/templates/center";
import VisaDetail from "src/components/molecules/dashboardTabs/components/visaDetails";
import { useQuery } from "@tanstack/react-query";
import apiService from "@lib/extensions/hook/apiService";
import React from "react";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Image from "@atom/image";
import Flex from "@/components/templates/flex";
import Spinner from "../../icons/spinner";
import { useGetAllVisaApplication } from "@/lib/hooks/dashboard/visa.hook";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";

const VisaWrapper = styled.div`
    background: ${ttColors.defaultColor};
    align-items: center;
    margin-top: 15px;

    & button {
        width: 154px !important;
    }

    @media screen and (max-width: 900px) {
        height: fit-content;
        padding: 20px 0;
    }
`;

const Visa = () => {
  const { isMobile } = useScreenResolution();
  const { queryParams, page, limit } = useDashboardStore((state) => state);

  async function getVisas() {
    return await apiService("/visa", "GET");
  }

  const { data } = useGetAllVisaApplication({
    query: { status: queryParams.join(','), currentPage: page, limit },
    options: { retry: 2 }
  });

  const {
    data: fetchedVisa,
    isLoading,
    error,
    refetch,
  } = useQuery(["visas"], getVisas) as any;
  if (isLoading) {
    return (
      <Flex height="450px" align="center" justify="center">
        <Spinner size="60px" fill={ttColors.blackishBlue} />
      </Flex>
    );
  }
  if (error) return <div>error loading visas, please try again</div>;
  const { data: visas } = fetchedVisa;
  // console.log({ visas })
  const content = {
    title: "You've got no Visa Application - Let's help you get Started",
    links: [
      { text: "Apply for Visa", url: "/apply/visa" },
      { text: "Book flight", url: "/flight" },
    ],
  };

  return (
    <VisaWrapper>
      <VisaDashboardHeader headerText="All Visa Applications" type="checkbox" />

      <div>
        {visas?.length > 0 ? (
          visas?.map((visa: any, i: number) => (
            <div key={i}>
              <VisaDetail visa={visa} refetch={refetch} />
            </div>
          ))
        ) : (
          <Center
            margin={isMobile ? "3.5rem 0px" : "10rem 0"}
            height="25rem"
          >
            <NoVisaApplication
              noVisaImage={"/assets/images/noVisa.png"}
              content={content}
            />
          </Center>
        )}
      </div>
    </VisaWrapper>
  );
};

export default Visa;
