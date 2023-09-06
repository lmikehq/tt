'use client'

import Button from "@atom/button";
import Center from "@atom/center";
import Flex from "@atom/flex";
import Image from "@atom/image";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import NotFound from "@image/not-found.svg";
import Navbar from "@organism/Navbar";
import { useScreenResolution } from "hook/useScreenResolution";
function NotFoundPage() {
  const { isMobile } = useScreenResolution();
  return (
    <div>
      <Navbar page="not-found" />
      <SectionLayout>
        <Center margin="5rem 0">
          <Flex direction="column" align="center">
            <Text
              type="p"
              text="Oopss!!"
              size={30}
              weight={700}
              color="#000000"
            />
            <Image
              src={NotFound}
              alt="not found"
              styles={{
                height: isMobile ? "120px" : "200px",
                marginTop: isMobile? "2rem" : "4rem",
              }}
            />

            <Text
              type="p"
              text="THE PAGE YOUR ARE LOOKING FOR COULD NOT BE FOUND"
              size={21}
              weight={500}
              color="#888888"
              textAlign="center"
            />

            <a href="/">
              <Button width="20rem" margin="3rem 0 0">
                <Text type="p" text="Return to Home Page" />
              </Button>
            </a>
          </Flex>
        </Center>
      </SectionLayout>
    </div>
  );
}

export default NotFoundPage;
