"use client";
import Text from "@atom/text";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { styled } from "styled-components";
import Modal from "../../../modal";
import Input from "@/components/atoms/input";
import { HiOutlineXMark } from "react-icons/hi2";
import { ttColors } from "@/lib/theme/colors";
import { ChangeEvent, useRef, useState } from "react";
import { DatePicker } from "../../../datepicker";
import dayjs from "dayjs";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import validator from "validator";
import { validateCardType } from "@/lib/extensions/helpers/validateCard";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { Mode } from "@/lib/types";
import Section from "@/components/molecules/section";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import { FormikProps } from "formik";
import { CardInfo } from "@/lib/types/request-models/flight/booking.type";
import { FieldAsDate, FieldInput } from "@/components/organisms/fieldInput";
import Spinner from "@/components/molecules/icons/spinner";

const Wrapper = styled.div`
    background: white;
    padding: 2rem 4rem;
    border-radius: 10px;
    width: 40vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 80vw;
    }
`;

export const CloseMark = styled(HiOutlineXMark)`
    background: #f3f3ff;
    border-radius: 4px;
    width: 3rem;
    height: 3rem;
    padding: 0.75rem;
    cursor: pointer;
`;

const StyledInput = styled.input`
    border: none;
    font-family: Poppins;
    font-size: 16px;
    width: 100%;
`;
interface PaymentModalProps {
    formik: FormikProps<CardInfo>;
    open: boolean;
    handleClose: () => void;
}

function PaymentModal({ open, handleClose, formik }: PaymentModalProps) {
    const {
        getCardNumberProps,
        getCardImageProps,
        meta: { erroredInputs },
    } = useCreditCardValidator();

    const { confirmPaymentMode } = useFlightBookingStore((state) => state);
    const isLoading = confirmPaymentMode == Mode.loading;

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");

    const { isMobile } = useScreenResolution();

    const handleCVV = (event: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = event.target.value.replace(/\D/g, "");
        const formattedNumber = formattedValue.match(/.{1,4}/g)?.join(" ");

        if (formattedValue.length <= 3) {
            setCvv(formattedNumber || "");
        }
    };

    return (
        <Modal open={open} handleClose={handleClose}>
            <Wrapper>
                <Flex direction="column" align="center">
                    <Flex
                        justify="flex-end"
                        styles={{
                            position: "absolute",
                            right: "1rem",
                            top: "1rem",
                        }}
                    >
                        <CloseMark fontSize={40} onClick={handleClose} />
                    </Flex>
                    <form onSubmit={formik.handleSubmit}>
                        <Flex
                            direction="column"
                            gap=".2rem"
                            justify="center"
                            align="center"
                        >
                            <Text
                                type="h2"
                                text="Insert Card"
                                size={30}
                                weight={600}
                            />
                            <Text
                                type="p"
                                text="Enter the your card detail for payment."
                                color="#929292"
                            />
                        </Flex>
                        <Flex
                            direction="column"
                            align="flex-start"
                            gap="1.5rem"
                            padding="2rem 0"
                        >
                            <Flex direction="column" gap=".5rem">
                                <Text type="p" text="Card Name" />
                                <FieldInput
                                    name={"holder"}
                                    placeholder={"Enter Card Name"}
                                    formik={formik}
                                />
                            </Flex>
                            <Flex direction="column" gap=".5rem">
                                <Text type="p" text="Card Number" />
                                <Section
                                    styles={{
                                        border: "1px solid #E7E7E7",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                    width="100%"
                                >
                                    <Flex
                                        justify="space-between"
                                        padding=".5rem 1rem"
                                    >
                                        <StyledInput
                                            {...getCardNumberProps()}
                                            onChange={formik.handleChange}
                                            name="number"
                                        />
                                        <svg
                                            {...getCardImageProps({ images })}
                                        />
                                    </Flex>
                                </Section>
                            </Flex>
                            <Flex
                                direction={isMobile ? "column" : "row"}
                                gap="2rem"
                                align="flex-start"
                            >
                                <Flex direction="column" gap=".5rem">
                                    <Text type="p" text="Expiry Date" />
                                    <FieldAsDate
                                        placeholder="MM/YY"
                                        minDate={dayjs()}
                                        views={["month", "year"]}
                                        name="expiryDate"
                                        format="MM/YY"
                                        formik={formik}
                                        onChange={(e) => {
                                            formik.setFieldValue(
                                                "expirationMonth",
                                                `${
                                                    dayjs(e.$d)
                                                        .format("MM/YY")
                                                        .split("/")[0]
                                                }`
                                            );
                                            formik.setFieldValue(
                                                "expirationYear",
                                                `${
                                                    dayjs(e.$d)
                                                        .format("MM/YY")
                                                        .split("/")[1]
                                                }`
                                            );
                                        }}
                                    />
                                </Flex>
                                <Flex direction="column" gap=".5rem">
                                    <Text type="p" text="CVV" />
                                    <FieldInput
                                        max={3}
                                        name="cvv"
                                        formik={formik}
                                        placeholder="Enter CVV"
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Button
                            height={"3.5rem"}
                            width="100%"
                            background={ttColors.blackishBlue}
                            type="submit"
                            onClick={() => {}}
                        >
                            {isLoading ? (
                                <Spinner size="40px" fill={ttColors.primary} />
                            ) : (
                                <Text
                                    type="p"
                                    text="Pay Now"
                                    size={16}
                                    weight={500}
                                />
                            )}
                        </Button>
                    </form>
                </Flex>
            </Wrapper>
        </Modal>
    );
}

export default PaymentModal;
