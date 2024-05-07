import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import Section from "../../section";
import { OverviewHeader } from "@/components/organisms/flight/booking/headers";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import SearchInput from "@/components/organisms/searchInput";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { Span } from "../components/styles";
import Spinner from "../../icons/spinner";
import Button from "@/components/atoms/button";
import { usePaymentStore } from "@/lib/store/payment.store";
import { Mode } from "@/lib/types";
import { useUserStore } from "@/lib/store/useStore";
import FormTitleAndSubtitle from "../../forms/FormTitleAndSubtitle";
import { capCase } from "@/lib/utilFns";
import { useStayMakePayment } from "@/lib/hooks/stay/booking.hook";
import { AiFillInfoCircle } from "react-icons/ai";
const defaultPayment = {
    name: "United States of America",
    flag: "/assets/flags/us.svg",
    code: "US",
    currencyCode: "USD",
    currency: "United States Dollar",
};
interface SelectPaymentMethodProps {
    paymentOptions: StayPaymentOption[];
    bookingId: string;
}
type PaymentProps = {
    countryCode: string;
    code: string;
    name: string;
    [k: string]: string;
};

function SelectPaymentMethod({
    paymentOptions,
    bookingId,
}: SelectPaymentMethodProps) {
    const { isMobile } = useScreenResolution();

    const [payment, setPayment] = useState(
        paymentOptions?.find((e) => e.currency_code === "USD") ??
            paymentOptions[0]
    );

    const handlePayment = (x: PaymentProps) => {
        setPayment((prev) => ({
            ...prev,
            countryCode: x.countryCode,
            code: x.code,
            currency: x.name,
        }));
    };
    const { mutateAsync: createPayment, isLoading } = useStayMakePayment();

    const { user } = useUserStore((state) => state);

    const makePayment = () => {
        const amount = parseInt(
            paymentOptions.find(
                (el) => el.currency_code == payment.currency_code
            )?.amount ?? ""
        );
        if (!payment.amount) return;
        createPayment({
            gateway: "flutterwave",
            currency: payment.currency_code,
            service: "HOTEL",
            serviceID: bookingId ?? "",
            paymentIntent: "STAYS FEE",
            user: user?._id ?? "",
            amount: parseFloat(payment.amount),
        }).then((res) => {
            window.open(res.data.link, "_blank");
        });
    };

    return (
        <Section
            padding="2rem 2rem"
            margin="2rem 0 0"
            background="white"
            borderRadius=".5rem"
            styles={{ boxShadow: "var(--box-shadow)" }}
        >
            {!isMobile && (
                <FormTitleAndSubtitle
                    title={"Stay Overview & Payment"}
                    subTitle={"Make payment for your stay booking"}
                />
            )}
            <Flex
                justify="space-between"
                margin={isMobile ? "1rem 0 2.5rem" : "3.5rem 0 3rem"}
            >
                <Text text="Price" type="p" size={20} weight={600} />
                <Text
                    text={`${payment.currency_code} ${parseFloat(
                        payment.amount
                    ).toFixed(2)}`}
                    type="p"
                    size={24}
                    weight={600}
                />
            </Flex>
            <Flex direction="column" gap="1rem" margin="0 0 1rem">
                <Text text="Select Currency" type="h3" size={16} />
                <SearchInput
                    options={COUNTRY_FLAGS.filter((el) =>
                        paymentOptions.findIndex(
                            (option) => option.currency_code == el.currencyCode
                        ) < 0
                            ? false
                            : true
                    ).map((x) => ({
                        name: x.currency,
                        flag: x.flag,
                        code: x.currencyCode,
                        countryCode: x.code,
                    }))}
                    onChange={(x) => handlePayment(x)}
                    disabled={true}
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
                                        (x) =>
                                            x.currencyCode ===
                                                payment.currency_code &&
                                            x.code === "US"
                                    )?.flag ?? ""
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
                                text={`${payment.currency_code} - ${
                                    payment.currency_code === "USD"
                                        ? defaultPayment.currency
                                        : ""
                                } (Pay ${capCase(payment.type)})`}
                            />
                        </Flex>
                        <IoIosArrowDown size={25} />
                    </Flex>
                </SearchInput>
                <Flex gap=".5rem" align="center">
                    <AiFillInfoCircle color={ttColors.primary} size="1.5rem" />
                    <Text
                        text="Only the Dollar currency is active for now. Other currencies will be made available soon."
                        type="p"
                        color="#606060"
                        size={14}
                    />
                </Flex>
            </Flex>
            <Span>
                <Button
                    width="100%"
                    margin=".5rem 0"
                    color="white"
                    padding="10px"
                    background={isLoading ? ttColors.dark : ttColors.dark}
                    onClick={makePayment}
                >
                    {isLoading ? (
                        <Spinner size="40px" fill={"white"} />
                    ) : (
                        <Text
                            type="p"
                            text="Make Payment"
                            color={"white"}
                            size="16px"
                        />
                    )}
                </Button>
            </Span>
        </Section>
    );
}

export default SelectPaymentMethod;
