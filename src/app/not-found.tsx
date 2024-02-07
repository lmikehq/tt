"use client";

import { ttColors } from "@/lib/theme/colors";
import Button from "@atom/button";

import Image from "@atom/image";
import Text from "@atom/text";
import SectionLayout from "@components/templates/SectionLayout";
import Center from "@components/templates/center";
import Flex from "@components/templates/flex";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Navbar from "@organism/Navbar";
function NotFoundPage() {
  const { isMobile } = useScreenResolution();
  return (
    <div>
      <Navbar page="not-found" />
      <SectionLayout>
        <Center margin="2rem 0">
          <Flex direction="column" align="center">
            <Text
                type="p"
                text="Oopss!!"
                size={isMobile ? 40 : 46}
                weight={700}
                color="#000000"
            />
            <Image
                src={"/assets/images/not-found-new.svg"}
                alt="not found"
                width={isMobile ? 350 : 600}
                height={isMobile? 300 : 350}
                styles={{
                    width: isMobile ? "120px" : "100px",
                    marginTop: isMobile ? "1rem" : "0rem",
                }}
            />

            <Text
                type="p"
                text="The treasure map seems to have gone astray. Let's find your destination together"
                size={isMobile ? 16 : 18}
                weight={500}
                width={isMobile ? '90%' : '35%'}
                color="#888888"
                textAlign="center"
            />

            <a href="/">
              <Button width="20rem" margin="2rem 0 0" background={ttColors.dark}>
                <Text type="p" text="Return to Home Page" size={14} />
              </Button>
            </a>
          </Flex>
        </Center>
      </SectionLayout>
    </div>
  );
}

export default NotFoundPage;
