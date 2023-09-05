"use client";
import Flex from "src/components/atoms/flex";
import { Grid } from "src/components/atoms/grid";
import Text from "src/components/atoms/text";
import UsefulLinks from "src/components/molecules/contactPage/components/usefulLink";
import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";
import CustomizedAccordions from "./components/customizedAccordion";
import { customNavigationLinks } from "data/customNavigationLinks";

const FaqsSection = styled.section`
  margin-top: 1rem;
`;

function FaqSection() {
  const { isMobile } = useScreenResolution();
  return (
    <FaqsSection>
      <Flex direction="column" justify="center" align="center" margin={"0px"}>
        <Text
          type="h1"
          text="Frequently Asked Questions"
          size={isMobile ? "1rem" : "2rem"}
        />
        <Text
          margin={isMobile ? "1rem 0px" : "1rem 0px"}
          size={isMobile ? "0.8rem" : "1rem"}
          styles={{
            width: `${isMobile ? "100%" : "50%"}`,
            textAlign: "center",
          }}
          type="p"
          text="If your question isn't covered here, don't hesitate to contact our knowledgeable team for personalized assistance"
        />
      </Flex>
      <Grid
        gap={isMobile ? "2rem" : "5rem"}
        columns={isMobile ? "100%" : "25% 70%"}
        margin="2rem auto"
      >
        <UsefulLinks navigationLinks={customNavigationLinks} />
        <Flex direction="column">
          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text
              type="h2"
              text="Thrillers Travels"
              size={isMobile ? "1.2rem" : "1.5rem"}
            />
            <CustomizedAccordions items={howWeWork} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text
              type="h2"
              text=" Migration Process"
              size={isMobile ? "1.2rem" : "1.5rem"}
            />
            <CustomizedAccordions items={makeItHappening} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text
              type="h2"
              text=" Eligibility and Requirements"
              size={isMobile ? "1.2rem" : "1.5rem"}
            />
            <CustomizedAccordions items={bookingYourVisa} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text
              type="h2"
              text="Financial Matters"
              size={isMobile ? "1.2rem" : "1.5rem"}
            />

            <CustomizedAccordions items={paymentAndBudget} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text
              type="h2"
              text=" Success Stories"
              size={isMobile ? "1.2rem" : "1.5rem"}
            />

            <CustomizedAccordions items={makeItHappening} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text
              type="h2"
              text=" Support and Assistance"
              size={isMobile ? "1.2rem" : "1.5rem"}
            />

            <CustomizedAccordions items={support} />
          </Flex>
        </Flex>
      </Grid>
    </FaqsSection>
  );
}

export default FaqSection;

const howWeWork = [
  {
    header: "What is Thrillers Travels?",
    description:
      "Thrillers Travels is a migration empowerment company, specializing in helping Nigerians migrate to Western countries for better opportunities. We offer comprehensive support to make the migration and life improvement accessible and inclusive.",
  },
  {
    header: "How long has Thrillers Travels been operating?",
    description:
      "The dream started in 2012, and we started Thrillers Human Development Foundation in 2018, and since then, we have been assisting individuals in realizing their dreams of migrating to Western countries.  but Thrillers Travels was founded in 2023, to increase the capacity and make this a big deal.",
  },
];

const makeItHappening = [
  {
    header: "What countries do you assist with migration to?",
    description:
      "We primarily focus on assisting migrants in moving to various Western countries, including but not limited to the United States, Canada, the United Kingdom, Australia, and European nations.",
  },
  {
    header: "What services do you offer to Nigerians",
    description:
      "Our services include migration consultation, application guidance, documentation support, interview preparation, and post-migration assistance. Users across the world can also book flights, hotels and reservations. We aim to provide a holistic approach to every stage of migration/relocation process.",
  },
];

const support = [
  {
    header: "What kind of support do you offer after migration?",
    description:
      "We provide post-migration support to help you settle into your new life. This includes guidance on job search, housing, cultural adaptation, and addressing any challenges you may face.",
  },
  {
    header: " Can I contact you for help during the migration process?",
    description:
      "Absolutely! Our consultants are available to address your questions and concerns throughout the migration journey. Feel free to reach out via email, phone, or in-person appointments.",
  },
];

const bookingYourVisa = [
  {
    header: "Who is eligible to apply for migration through Thrillers Travels?",
    description:
      "We work with young Nigerian individuals who aspire to migrate for better opportunities. Eligibility criteria often depend on the specific requirements of the destination country.",
  },
  {
    header: "What are the general requirements for migration?",
    description:
      "General requirements usually involve educational qualifications, work experience, language proficiency (like IELTS or TOEFL), and sometimes proof of funds. Requirements may vary based on the chosen destination.",
  },
];

const paymentAndBudget = [
  {
    header: "How much does your service cost?",
    description:
      "Our service fees vary based on the destination country and the complexity of the case. We believe in transparency, and our consultants will provide a detailed breakdown of costs during your consultation.",
  },
  {
    header: "Do you offer financial assistance for migration costs?",
    description:
      "While we don't provide direct financial assistance, our team helps applicants explore options for financing their migration journey through scholarships, loans, and other resources.",
  },
];
