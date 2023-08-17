import Flex from "@atom/flex";
import Image from "@atom/image";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Div from "@molecule/div";
import Section from "@molecule/section";
import { MenuItem, Select } from "@mui/material";
import { useScreenResolution } from "hook/useScreenResolution";
import { BiSolidInfoCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import nigerianFlag from "@flag/ng.svg";
import { styled } from "styled-components";
import SelectInput from "@molecule/select/SelectInput";

const RoundFlag = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-image: url(${nigerianFlag.src});
`;

const SelectPaymentMethod = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <Section margin="0 0 3.375rem 0">
        <Text
          text={"Select Visa Payment"}
          type={"h3"}
          weight={600}
          size={24}
          margin={"0 0 0.75rem 0"}
        />
        <Text
          text={"Select your preferred currency to make payment"}
          weight={400}
          size={18}
          color="#606060"
          type={"p"}
          margin={""}
        />
      </Section>
      <Section>
        <Text
          text={"Select currency"}
          weight={400}
          size={18}
          type={"h5"}
          margin={"0 0 1.125rem 0"}
        />

        <Div margin="0 0 1.5rem 0">
          <SelectInput
            style={{ height: "3.5rem", width: "100%", borderRadius: "6px" }}
            iconComponent={IoIosArrowDown}
            defaultValue={10}
          >
            <MenuItem value={10}>
              <Flex gap="1.5rem" alignSelf="center" align="center">
                <RoundFlag />
                <Text type="p" text="NGN - Nigerian Naira" />{" "}
              </Flex>
            </MenuItem>
          </SelectInput>
        </Div>
        <Div styles={{ display: "flex" }}>
          <BiSolidInfoCircle
            size={32}
            color={"#6092A7"}
            style={{ marginRight: "1.125rem" }}
          />
          <Div>
            <Text
              text="Only the Nigerian currency naira (Naira) is active for now. Other currencies will be made available soon."
              type="p"
            />
          </Div>
        </Div>
      </Section>
    </Section>
  );
};

export default SelectPaymentMethod;
