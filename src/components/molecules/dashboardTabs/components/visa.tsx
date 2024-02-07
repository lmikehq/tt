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
import { VisaResponseProp } from "@/lib/types/response-models/dashboard";
import PaginationCtrl from "../../pagination";

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
  const { queryParams, page, limit, setPage, search, startDate, endDate } = useDashboardStore((state) => state);

  const { data, isLoading, isError, refetch } = useGetAllVisaApplication({
    query: { status: queryParams.join(','), currentPage: page, limit, search, startDate, endDate },
    options: { retry: 2 }
  });

  const visas: VisaResponseProp[] = data?.visas as VisaResponseProp[];
  const totalCount: number = data?.totalCount as number;
  const filteredCount: number = data?.filteredCount as number;

  if (isLoading) {
    return (
      <Flex height="450px" align="center" justify="center">
        <Spinner size="60px" fill={ttColors.blackishBlue} />
      </Flex>
    );
  }
  if (isError) return <div>error loading visas, please try again</div>;
  // const { data: visas } = fetchedVisa;
  // console.log(visas);

  const content = {
    title: "You've got no Visa Application - Let's help you get Started",
    links: [
      { text: "Apply for Visa", url: "/visa" },
      { text: "Book flight", url: "/flight" },
      { text: "Search Stays", url: "/stay" }
    ],
  };

  return (
    <VisaWrapper>
      <VisaDashboardHeader headerText="All Visa Applications" type="checkbox" />

      <div>
        {visas?.length > 0 ? (
          <>
            {visas?.map((visa: VisaResponseProp, i: number) => {
              return (
                <div key={i}>
                  <VisaDetail visa={visa} refetch={refetch} />
                </div>
              );
            })}
            <PaginationCtrl<VisaResponseProp> data={visas} page={page} setPage={setPage} filteredCount={filteredCount} totalCount={totalCount} />
          </>
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
