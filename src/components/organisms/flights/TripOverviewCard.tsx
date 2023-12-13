import Text from "@/components/atoms/text";
import SearchFlagInput from "@/components/molecules/searchInputs/searchFlagInput";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { ttColors } from "@/lib/theme/colors";
import { AiFillInfoCircle } from "react-icons/ai";
import SearchInput from "../searchInput";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { OverviewHeader } from "../flight/booking/headers";

type PaymentProps = {
    countryCode: string;
    code: string;
    name: string;
};

function TripOverviewCard() {
    const { isMobile } = useScreenResolution();

    const [payment, setPayment] = useState({
        countryCode: "NG",
        code: "NGN",
        currency: "Nigerian Naira",
    });

    const handlePayment = (x: PaymentProps) => {
        setPayment((prev) => ({
            ...prev,
            countryCode: x.countryCode,
            code: x.code,
            currency: x.name,
        }));
    };

    return (
        <Section padding="1rem 0 0 0">
            {!isMobile && <OverviewHeader />}
            <Flex direction="column" gap=".8rem" padding="3rem 0">
                <Text text="Select Currency" type="h3" size={16} />
                <SearchInput
                    options={COUNTRY_FLAGS.map((x) => ({
                        name: x.currency,
                        flag: x.flag,
                        code: x.currencyCode,
                        countryCode: x.code,
                    }))}
                    onChange={(x) => handlePayment(x)}
                    disabled
                >
                    <Flex
                        gap=".6rem"
                        justify="space-between"
                        cursor="pointer"
                        align="center"
                    >
                        <Flex gap="1.4rem" align="center">
                            <img
                                src={
                                    COUNTRY_FLAGS.find(
                                        (x) => x.code === payment.countryCode
                                    )?.flag
                                }
                                alt="flag"
                                style={{
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <Text
                                type="p"
                                text={`${payment.code} - ${payment.currency}`}
                            />
                        </Flex>
                        <IoIosArrowDown size={25} />
                    </Flex>
                </SearchInput>
                <Flex gap="1rem" align="center">
                    <AiFillInfoCircle color={ttColors.primary} size="1.5rem" />
                    <Text
                        text="Only the Nigerian currency (Naira) is active for now. Other currencies will be made available soon."
                        type="p"
                        color="#606060"
                        size={15}
                    />
                </Flex>
            </Flex>
        </Section>
    );
}

export default TripOverviewCard;
