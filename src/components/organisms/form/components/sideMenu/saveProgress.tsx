'use client'

import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { toast } from "react-hot-toast";
import { BsFillShieldLockFill } from "react-icons/bs";
import { ttColors } from "@lib/theme/colors";
import { useState } from "react";
import Spinner from "@/components/molecules/icons/spinner";

interface SaveProgressAndContinueLaterProps {
  saveProgress?: () => void;
}
const SaveProgressAndContinueLater = ({
  saveProgress,
}: SaveProgressAndContinueLaterProps) => {
    const { isMobile } = useScreenResolution();
    const [isLoading, setLoading] = useState(false)

    const handleSaveProgress = () => {
        setLoading(true)
        saveProgress && saveProgress()
    }

  return (
    <Section height="unset">
      <Flex gap=".5rem">
        <BsFillShieldLockFill size="24px" color={ttColors.primary} />
        <div>
          <Text
            text="Your info is safe with us"
            type="p"
            size={14}
            weight={500}
            styles={{ lineHeight: "27px" }}
          />
          <p style={{ fontSize: "14px", color: "#929292" }}>
            For more details, see our &nbsp;
            <span
              style={{
                color: ttColors.primary,
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              data protection page
            </span>
          </p>
        </div>
      </Flex>

      <Flex
        styles={{ display: isMobile ? "none" : "block" }}
        margin={isMobile ? "1.5rem 0 0 0 " : "3rem 0 0 0"}
        direction="column"
      >
        <Section height="unset" styles={{ marginBottom: "0.5rem" }}>
          <Button
            border="1px solid #06062A"
            width="100%"
            background="none"
            borderRadius="4px"
            padding="1.5rem"
            onClick={handleSaveProgress}
            >
            {isLoading ? (
                <Spinner size="40px" fill={ttColors.primary} />
            ) : (
                <Text
                    type="p"
                    text="Save Progress & Continue Later"
                    size={15}
                    color="#06062A"
                    cursor="pointer"
                    weight={600}
                />
            )}
          </Button>
        </Section>
        <Section height="unset">
          <Link href="/">
            <Button
              border="1px solid #06062A"
              width="100%"
              background="none"
              borderRadius="4px"
              padding="1.5rem"
              onClick={() => toast.success("Application Exited Successfully!")}
            >
              <Text
                type="p"
                text="Exit Application"
                weight={600}
                size={15}
                color="#06062A"
                cursor="pointer"
              />
            </Button>
          </Link>
        </Section>
      </Flex>
    </Section>
  );
};

export default SaveProgressAndContinueLater;
