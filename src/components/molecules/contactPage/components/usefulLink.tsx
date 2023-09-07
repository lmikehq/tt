"use client";

import Flex from "src/components/atoms/flex";
import { Grid } from "@components/templates/grid";
import Link from "src/components/atoms/link";
import Text from "src/components/atoms/text";
import Section from "src/components/molecules/section";
import { styled } from "styled-components";

const ContactLink = styled.div`
  height: fit-content;
  width: 100%;
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;

  @media screen and (max-width: 900px) {
    height: fit-content;
  }
`;

type NavigationLink = {
  number: string;
  text: string;
  href: string;
};

function UsefulLinks({
  navigationLinks,
}: {
  navigationLinks: NavigationLink[];
}) {
  return (
    <ContactLink>
      <Text type="h4" text="Navigate to:" size="1rem" />

      <Section
        margin="1rem 0 0"
        styles={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {navigationLinks.map((link) => (
          <Flex gap="1rem" key={link.number} align="center">
            <Text type="h6" text={link.number} color="#343a40" />
            <Link href={link.href}>
              <Text
                type="p"
                decoration="underline"
                color="#87CEEB"
                weight="500"
                letterSpacing={1}
                text={link.text}
              />
            </Link>
          </Flex>
        ))}
      </Section>
    </ContactLink>
  );
}

export default UsefulLinks;
