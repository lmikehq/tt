import React from "react";
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    TableCellProps,
} from "@mui/material";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import Button from "@/components/atoms/button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckIcon from "@mui/icons-material/Check";
import Flex from "@/components/templates/flex";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";

interface StyledTableCellProps extends TableCellProps {
    textAlign?: "center" | "left" | "right";
    hideBorder?: boolean;
    isHeader?: boolean;
    isRecommended?: boolean;
    isLastChild?: boolean;
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>(
    ({ textAlign, hideBorder, isHeader, isRecommended, isLastChild }) => {
        const recommendedColors = isRecommended
            ? `3px solid ${ttColors.primary600}`
            : "";
        return {
            textAlign: textAlign ? textAlign : "center",
            border: hideBorder ? "none" : `1px solid ${ttColors.gray}`,
            borderLeft: recommendedColors,
            borderRight: recommendedColors,
            borderBottom: isLastChild ? recommendedColors : "",
            borderTop: isHeader ? recommendedColors : "",
            position: isHeader ? "relative" : "unset",
            "&::before": {
                content: isHeader ? '"Recommended"' : '""',
                display: isHeader ? "block" : "none",
                position: "absolute",
                bottom: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#7BBBD6",
                borderRadius: "10px 10px 0 0",
                color: "white",
                width: "100%",
                padding: "0 3px",
                paddingTop: "10px",
                paddingBottom: "10px",
            },
        };
    }
);

const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
        backgroundColor: ttColors.grayishAsh,
    },
}));

const Table = styled(MuiTable)(() => ({
    borderSpacing: "5px 1px",
    borderCollapse: "separate",
    paddingTop: "45px",
}));

const TicketFareTable = () => {
    const { setStep } = useFlightBookingStore((state) => state);

    const data = [
        {
            feature: "Date or time changes",
            icon: "/assets/icons/date-time.svg",
            basic: "Fees Apply",
            flex: "Free",
            superFlex: "Free",
        },
        {
            feature: "Refundable ticket",
            icon: "/assets/icons/dollar-broken.svg",
            basic: "$ 30",
            flex: "Free",
            superFlex: "Free",
        },
        {
            feature: "Change booking fee",
            icon: "/assets/icons/air-tickets.svg",
            basic: <CloseOutlinedIcon />,
            flex: <CheckIcon />,
            superFlex: <CheckIcon />,
        },
        {
            feature: "High priority assistance",
            icon: "/assets/icons/headset.svg",
            basic: <CloseOutlinedIcon />,
            flex: <CheckIcon />,
            superFlex: <CheckIcon />,
        },
        {
            feature: "",
            icon: "",
            basic: (
                <Button variant="outline" color={ttColors.dark}>
                    Select
                </Button>
            ),
            flex: (
                <Button
                    variant="solid"
                    background={ttColors.dark}
                    onClick={() => setStep({ step: 4 })}
                >
                    Select
                </Button>
            ),
            superFlex: (
                <Button variant="outline" color={ttColors.dark}>
                    {" "}
                    Select
                </Button>
            ),
            isButtonRow: true,
        },
    ];

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell hideBorder></StyledTableCell>
                        <StyledTableCell>
                            <Text weight={"600"} text="Basic" type="p" />
                            <Text text="$ 0" type="p" />
                        </StyledTableCell>
                        <StyledTableCell isHeader isRecommended>
                            <Text weight={"600"} text="Flex" type="p" />
                            <Text text="€ 50" type="p" />
                            <Text
                                size={10}
                                text="100% discount applied"
                                type="p"
                                color="#606060"
                                styles={{ lineHeight: "14px" }}
                            />
                        </StyledTableCell>
                        <StyledTableCell>
                            <Text weight={"600"} text="SuperFlex" type="p" />
                            <Text text="$ 150" type="p" />
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) =>
                        row.isButtonRow ? (
                            <TableRow key={row.feature}>
                                <TableCell></TableCell>
                                <TableCell>{row.basic}</TableCell>
                                <TableCell>{row.flex}</TableCell>
                                <TableCell>{row.superFlex}</TableCell>
                            </TableRow>
                        ) : (
                            <StyledTableRow key={row.feature}>
                                <StyledTableCell hideBorder textAlign={"left"}>
                                    <Flex gap="10px" align="center">
                                        <img src={row.icon} alt={row.feature} />
                                        <Text type="p" text={row.feature} />
                                    </Flex>
                                </StyledTableCell>
                                <StyledTableCell>{row.basic}</StyledTableCell>
                                <StyledTableCell
                                    isRecommended
                                    isLastChild={index === data.length - 2}
                                >
                                    {row.flex}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.superFlex}
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TicketFareTable;
