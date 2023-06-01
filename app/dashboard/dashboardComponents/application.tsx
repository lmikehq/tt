import styled from "styled-components";
import Text from "@atom/text";
import { HiPencil } from "react-icons/hi";

import CustomTab from "@atom/tabs";
import { ttColors } from "theme/colors";

const Section = styled.div``;
const SectionTitle = styled.div``;
const SectionTabs = styled.div`
  .MuiBox-root.css-1gsv261 {
    box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
    border-radius: 12px;
  }
  .MuiButtonBase-root {
    width: 50%;

    .flex__FlexWrapper-sc-996d4228-0 {
      justify-content: center;
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
