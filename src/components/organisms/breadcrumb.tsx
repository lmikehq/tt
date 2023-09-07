"use client";

import Link from "@atom/link";
import { capitalized } from "@lib/extensions/helpers/capitalize";
import { usePathname } from "next/navigation";
import { RxSlash } from "react-icons/rx";
import styled from "styled-components";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import SectionLayout from "@components/templates/SectionLayout";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

const BreadcrumbContainer = styled.div`
  font-size: 14px;
  margin-bottom: 2rem;

  @media screen and (max-width: 900px) {
    margin-top: -1.5rem;
    margin-bottom: 1rem;
  }
`;

const Breadcrumb = () => {
  const { isMobile } = useScreenResolution();

  let path = usePathname();
  let pathArray = path.split("/");
  return (
    <BreadcrumbContainer>
      <SectionLayout>
        <Flex gap={isMobile ? "0px" : ".7rem"} align="center">
          <Link href="/">
            <Text
              type="p"
              text="Home"
              size="1rem"
              weight={600}
              decoration="underline"
            />
          </Link>
          <RxSlash color="#6C757D" />
          {pathArray.map((item, index) => {
            if (item === "") {
              return null;
            }
            item = item.replace(/-/g, " ");
            if (index === pathArray.length - 1) {
              return (
                <Text
                  key={index}
                  type="p"
                  text={item}
                  size="1rem"
                  weight={100}
                  decoration="none"
                />
              );
            }
            return (
              <Flex
                key={index}
                width="fit-content"
                align="center"
                gap={isMobile ? "0px" : "1rem"}
              >
                <Link href={pathArray.slice(0, index + 1).join("/")}>
                  <Text
                    type="p"
                    text={capitalized(item)}
                    size="1rem"
                    weight={600}
                    decoration="underline"
                  />
                </Link>
                <RxSlash color="#6C757D" />
              </Flex>
            );
          })}
        </Flex>
      </SectionLayout>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
