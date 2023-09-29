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

const VisaWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 0
  }
`;

const Visa = () => {
  const { isMobile } = useScreenResolution();

  async function getVisas() {
    return await apiService("/visa", "GET");
  }

  const {
    data: fetchedVisa,
    isLoading,
    error,
    refetch,
  } = useQuery(["visas"], getVisas) as any;
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error loading visas, please try again</div>;
  const { data: visas } = fetchedVisa;

  const content = {
    title: "You’ve got no Visa Application - Let’s help you get Started",
    links: [
      { text: "Apply for Visa", url: "/apply/visa" },
      { text: "Book flight", url: "/flight" },
    ],
  };

  function NoVisaImg() {
    return <Image src="/assets/images/noVisa.png" alt="" />;
  }

  return (
    <VisaWrapper>
      <VisaDashboardHeader headerText="All Visa Applications" />

      <div>
        {visas?.length > 0 ? (
          visas?.map((visa: any, i: number) => (
            <div key={i}>
              <VisaDetail visa={visa} refetch={refetch}/>
            </div>
          ))
        ) : (
          <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
            <NoVisaApplication noVisaImage={NoVisaImg} content={content} />
          </Center>
        )}
      </div>
    </VisaWrapper>
  );
};

export default Visa;
