import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import Section from "../../section";
import { OverviewHeader } from "@/components/organisms/flight/booking/headers";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import SearchInput from "@/components/organisms/searchInput";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Span } from "../components/styles";
import Spinner from "../../icons/spinner";
import Button from "@/components/atoms/button";
import { usePaymentStore } from "@/lib/store/payment.store";
import { Mode } from "@/lib/types";
import { useUserStore } from "@/lib/store/useStore";
import FormTitleAndSubtitle from "../../forms/FormTitleAndSubtitle";

interface SelectPaymentMethodProps {
    paymentOptions: StayPaymentOption[];
    bookingId: string;
}
type PaymentProps = {
    countryCode: string;
    code: string;
    name: string;
};

function SelectPaymentMethod({
    paymentOptions,
    bookingId,
}: SelectPaymentMethodProps) {
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
    const { createFlutterWavePayment, mode } = usePaymentStore(
        (state) => state
    );
    const isLoading = mode == Mode.loading;

    const { user } = useUserStore((state) => state);

    const makePayment = () => {
        console.log("payment");
        const amount = parseInt(
            paymentOptions.find((el) => el.currency_code == payment.code)
                ?.amount ?? ""
        );
        console.log(payment);
        if (!amount) return;
        createFlutterWavePayment({
            gateway: "flutterwave",
            currency: payment.code,
            service: "HOTEL",
            serviceID: bookingId ?? "",
            paymentIntent: "STAYS FEE",
            user: user?._id ?? "",
            amount: amount,
        }).then((res) => {
            window.open(res.data.link, "_blank");
        });
    };
    return (
        <Section padding="1rem 0 0 0">
            {!isMobile && (
                <FormTitleAndSubtitle
                    title={"Stay Overview & Payment"}
                    subTitle={"Make payment for your stay booking"}
                />
            )}
            <Flex direction="column" gap=".8rem" padding="3rem 0">
                <Text text="Select Currency" type="h3" size={16} />
                <SearchInput
                    options={COUNTRY_FLAGS.filter((el) =>
                        paymentOptions.findIndex(
                            (option) => option.currency_code == el.currencyCode
                        ) == -1
                            ? false
                            : true
                    ).map((x) => ({
                        name: x.currency,
                        flag: x.flag,
                        code: x.currencyCode,
                        countryCode: x.code,
                    }))}
                    onChange={(x) => handlePayment(x)}
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
                {/* <Flex gap="1rem" align="center">
                    <AiFillInfoCircle color={ttColors.primary} size="1.5rem" />
                    <Text
                        text="Only the Nigerian currency (Naira) is active for now. Other currencies will be made available soon."
                        type="p"
                        color="#606060"
                        size={15}
                    />
                </Flex> */}
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
