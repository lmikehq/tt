import Button from "@atom/button";
import Flex from "@atom/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import Section from "@molecule/section";
import { toast } from "react-hot-toast";
import { BsFillShieldLockFill } from "react-icons/bs";
import { ttColors } from "theme/colors";

const SaveProgressAndContinueLater = () => {
  return (
    <Section height="unset">
      <Flex gap=".5rem">
        <BsFillShieldLockFill size="24px" color={ttColors.primary} />
        <div>
          <Text
            text="Your info is safe with us"
            type="p"
            size={18}
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

      <Flex margin="3rem 0 0 0" direction="column" gap="0.5rem">
        <Button
          border="1px solid #06062A"
          width="100%"
          background="none"
          borderRadius="4px"
          padding="1.5rem"
        >
          <Text
            type="p"
            text="Save Progress & Continue Later"
            size={16}
            color="#06062A"
            cursor="pointer"
            weight={600}
          />
        </Button>
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
              size={16}
              color="#06062A"
              cursor="pointer"
            />
          </Button>
        </Link>
      </Flex>
    </Section>
  );
};

export default SaveProgressAndContinueLater;
