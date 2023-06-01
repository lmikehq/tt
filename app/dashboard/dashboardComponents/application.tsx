import styled from "styled-components";
import Text from "@atom/text";
import { HiPencil } from "react-icons/hi";

import CustomTab from "@atom/tabs";
import { ttColors } from "theme/colors";

const Section = styled.div``;
const SectionTitle = styled.div``;
const SectionTabs = styled.div`
  .MuiTabs-flexContainer {
    height: 60px;
    width: 100%;
    justify-content: center !important;
    // gap: 10px;
    box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
    border-radius: 5px;
    background: ${ttColors.defaultColor};
    align-items: center;
    text-algin: center;
    border: 1px solid gold;
  }

  .MuiButtonBase-root {
    width: 50% !important;

    .flex__FlexWrapper-sc-996d4228-0 {
      justify-content: start;
    }
  }
`;

const Application = () => {
  const tabItem = [
    {
      label: "Visa",
      icon: <HiPencil size="2rem" />,
      value: 0,
      // content: <Visa />,
    },

    {
      label: "Flight",
      icon: <HiPencil size="2rem" />,
      value: 1,
      // content: <Flight />,
    },
  ];
  return (
    <Section>
      <SectionTitle>
        <Text type="h3" text="All application" />
        <Text type="p" text="Upcoming" />
      </SectionTitle>
      <SectionTabs>
        <CustomTab tabItems={tabItem} />
      </SectionTabs>
    </Section>
  );
};

export default Application;
