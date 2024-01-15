import React, { useState } from "react";
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
import sleep from "@/lib/extensions/helpers/sleep";
import Spinner from "@/components/molecules/icons/spinner";
import { Poppins } from "next/font/google";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
const poppins = Poppins({
  weight: "400",
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  subsets: ["latin-ext"],
});

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
      ? `2px solid ${ttColors.primary600}`
      : "";
    return {
      textAlign: textAlign ?? "center",
      border: hideBorder ? "none" : `1px solid ${ttColors.lightestGray}`,
      borderLeft: recommendedColors,
      borderRight: recommendedColors,
      borderBottom: isLastChild ? recommendedColors : "",
      borderTop: isHeader ? recommendedColors : "",
      position: isHeader ? "relative" : "unset",
      "&::before": {
        content: isHeader ? '"Recommended"' : '""',
        display: isHeader ? "block" : "none",
        position: "absolute",
        bottom: "77%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#7BBBD6",
        borderRadius: "10px 10px 0 0",
        color: "white",
        width: "98.5%",
        padding: "0 3px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontFamily: 'Poppins',
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
  borderSpacing: "5px 0px",
  borderCollapse: "separate",
  paddingTop: "45px",
}));

const TicketFareTable = () => {
  const { nextStep } = useFlightBookingStore((state) => state);
  const { isMobile } = useScreenResolution();
  const [loading, setLoading] = useState({
    active: false,
    index: 1,
  });
  const [active, setActive] = useState("");

  const proceed = async (x: string) => {
    setActive(x);
    setLoading(prev => ({
      ...prev,
      active: true, index: x === 'basic' ? 0 : x === 'flex' ? 1 : 2
    }));
    await sleep(500);
    nextStep();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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
        <Button
          styles={{ minWidth: '100%' }}
          height="3.5rem"
          variant={active === 'basic' ? "solid" : "outline"}
          background={active === 'basic' ? ttColors.dark : "white"}
          color={active === 'basic' ? "white" : ttColors.dark}
          onClick={() => proceed('basic')}
        >
          {(loading.active && loading.index === 0) ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) : (
            <Text type="p" size={16} text="Select" weight={500} />
          )}
        </Button>
      ),
      flex: (
        <Button
          styles={{ minWidth: '100%' }}
          height="3.5rem"
          variant={active === 'flex' ? "solid" : "solid"}
          background={active === 'flex' ? ttColors.dark : ttColors.dark}
          color={active === 'flex' ? "white" : "white"}
          onClick={() => proceed('flex')}
        >
          {(loading.active && loading.index === 1) ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) : (
            <Text type="p" size={16} text="Select" weight={500} />
          )}
        </Button>
      ),
      superFlex: (
        <Button
          styles={{ minWidth: '100%' }}
          height="3.5rem"
          variant={active === 'super-flex' ? "solid" : "outline"}
          background={active === 'super-flex' ? ttColors.dark : "white"}
          color={active === 'super-flex' ? "white" : ttColors.dark}
          onClick={() => proceed('super-flex')}
        >
          {(loading.active && loading.index === 2) ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) : (
            <Text type="p" size={16} text="Select" weight={500} />
          )}
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
              <Text
                weight={600}
                text="Basic"
                type="p"
                size={isMobile ? 16 : 18}
              />
              <Text
                text="$ 0"
                type="p"
                weight={500}
                color={ttColors.foundation.black}
              />
            </StyledTableCell>
            <StyledTableCell isHeader isRecommended>
              <Text
                weight={600}
                text="Flex"
                type="p"
                size={isMobile ? 16 : 18}
              />
              <Text
                text="€ 50"
                type="p"
                decoration={"line-through"}
                weight={500}
                color={ttColors.foundation.black}
              />
              <Text
                size={10}
                text="100% discount applied"
                type="p"
                color="#606060"
                styles={{ lineHeight: "14px" }}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Text
                weight={600}
                text="SuperFlex"
                size={isMobile ? 16 : 18}
                type="p"
              />
              <Text
                text="$ 150"
                type="p"
                weight={500}
                color={ttColors.foundation.black}
              />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) =>
            row.isButtonRow ? (
              <TableRow key={row.feature} style={{ minWidth: '1000px', borderBottom: 'none' }}>
                <TableCell style={{ borderBottom: 'none' }}></TableCell>
                <TableCell style={{ textAlign: 'center', borderBottom: 'none' }}>{row.basic}</TableCell>
                <TableCell style={{ textAlign: 'center', borderBottom: 'none' }}>{row.flex}</TableCell>
                <TableCell style={{ textAlign: 'center', borderBottom: 'none' }}>{row.superFlex}</TableCell>
              </TableRow>
            ) : (
              <StyledTableRow key={row.feature}>
                <StyledTableCell hideBorder textAlign="left" >
                  <Flex gap="10px" align="center">
                    <img src={row.icon} alt={row.feature} />
                    <Text type="p" text={row.feature} weight={500} />
                  </Flex>
                </StyledTableCell>
                <StyledTableCell>
                  {typeof row.basic === 'string' ? (
                    <Text type="p" text={row.basic} weight={500} />
                  ) : row.flex}
                </StyledTableCell>
                <StyledTableCell
                  isRecommended
                  isLastChild={index === data.length - 2}
                >
                  {typeof row.flex === 'string' ? (
                    <Text type="p" text={row.flex} weight={500} />
                  ) : row.flex}
                </StyledTableCell>
                <StyledTableCell>
                  {typeof row.superFlex === 'string' ? (
                    <Text type="p" text={row.superFlex} weight={500} />
                  ) : row.flex}
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
