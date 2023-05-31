import Flex from "@atom/flex";
import SectionTitle from "@atom/sectionTitle";
import SectionLayout from "@components/layouts/sectionLayout";
import AllCountryHead from "@organism/AllCountry/allCountryHead";
import React from "react";
import canada from "@image/canada-cover.png";
import ApplicationForm from "@organism/form/applicationForm";

interface pageProps {}

const VisaApplicationPage: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <AllCountryHead cover={canada} title="CANADA" />
      <SectionLayout>
        <SectionTitle
          title="Apply Now for Canada Employment Visa"
          description="We'll Handle Your Travel Documentation Hassles, and Ensure a Seamless travel experience for you"
          showButton={false}
        />
        <ApplicationForm />
      </SectionLayout>
    </div>
  );
};
export default VisaApplicationPage;
