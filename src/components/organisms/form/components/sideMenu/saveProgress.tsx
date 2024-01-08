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
import React, { useState } from "react";
import Spinner from "@/components/molecules/icons/spinner";
import Modal from "@/components/organisms/modal";
import { TbDoorExit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Grid } from "@/components/templates/grid";

interface ExitModalProps {
    onClose: VoidFunction,
    onExit: VoidFunction
}
function ExitModal({ onClose, onExit }: ExitModalProps) {
    const { isMobile } = useScreenResolution()

    return (
        <Flex
            direction="column"
            align="center"
            gap="1.5rem"
            background="white"
            padding="4rem"
            borderRadius="16px"
            width={isMobile ? "95vw" : "35vw"}
        >
            <Flex width="100%" justify="center">
                <Flex
                    width="max-content"
                    padding="1rem"
                    borderRadius="50%"
                    background={ttColors.red100}
                >
                    <TbDoorExit size={28} color={ttColors.red} />
                </Flex>
            </Flex>

            <Text
                type="h2"
                text="Exit Application?"
                weight={600}
                size={25}
                textAlign="center"
            />
            <Text
                type="h2"
                text="Are you sure you want to cancel your application? All progress will be lost if it has not been saved."
                size={14}
                color={ttColors.lighterGray}
                textAlign="center"
            />

            <Grid columns={isMobile ? 1 : 2} width="100%" gap="1rem">
                <Button
                    width="100%"
                    padding="1.8rem 0"
                    onClick={onClose}
                    border="1px solid lightgray"
                    background="transparent"
                    color={ttColors.foundation.gray}
                >
                    <Text type="p" text="No Thanks" />
                </Button>
                <Button
                    width="100%"
                    padding="1.8rem 0"
                    onClick={onExit}
                    background={ttColors.red}
                    color="white"
                >
                    <Text type="p" text="Exit" />
                </Button>
            </Grid>
        </Flex>
    )
}
interface SaveProgressAndContinueLaterProps {
  saveProgress?: () => void;
}
const SaveProgressAndContinueLater = ({
  saveProgress,
}: SaveProgressAndContinueLaterProps) => {
    const { push } = useRouter()
    const { isMobile } = useScreenResolution();
    const [isLoading, setLoading] = useState(false)
    const [isExitLoading, setExitLoading] = useState(false)
    const [isOpenModal, setOpenModal] = useState(false)

    const handleSaveProgress = () => {
        setLoading(true)
        saveProgress && saveProgress()
    }

    const handleExit = () => {
        setExitLoading(true)
        push('/')
    }

    return (
        <React.Fragment>
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
                        <Button
                            border="1px solid #06062A"
                            width="100%"
                            background="none"
                            borderRadius="4px"
                            padding="1.5rem"
                            onClick={() => setOpenModal(true)}
                        >
                            {isExitLoading ? (
                                <Spinner size="40px" fill={ttColors.primary} />
                            ) : (
                                <Text
                                    type="p"
                                    text="Exit Application"
                                    weight={600}
                                    size={15}
                                    color="#06062A"
                                    cursor="pointer"
                                />
                                    
                            )}
                        </Button>
                    </Section>
                </Flex>
            </Section>

            <Modal
                open={isOpenModal}
                handleClose={() => setOpenModal(false)}
            >
                <ExitModal
                    onClose={() => setOpenModal(false)}
                    onExit={handleExit}
                />
            </Modal>
        </React.Fragment>
  );
};

export default SaveProgressAndContinueLater;
