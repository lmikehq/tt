import Center from "@components/templates/center";
import VisaDetail from "src/components/molecules/dashboardTabs/components/visaDetails";
import { useQuery } from "@tanstack/react-query";
import apiService from "hook/apiService";
import React from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";

const VisaWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const Visa = () => {
  async function getVisas() {
    return await apiService("/visa", "GET");
  }

  const {
    data: fetchedVisa,
    isLoading,
    error,
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

  return (
    <VisaWrapper>
      <VisaDashboardHeader headerText="All Visa Applications" />

      <div>
        {visas?.length > 0 ? (
          visas?.map((visa: any, i: number) => (
            <React.Fragment key={i}>
              <VisaDetail visa={visa} />
            </React.Fragment>
          ))
        ) : (
          <Center margin="10rem 0" height="25rem">
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
