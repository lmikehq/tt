import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Divider } from "@/components/atoms/divider";
import Text from "@/components/atoms/text";

type AccordionTypes = {
  children: React.ReactNode;
  summary: string;
  divider: boolean | true;
  direction: "horizontal" | "vertical";
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`,
  backgroundColor: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "2rem" }} />}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0.5),
  },
  padding: ".8rem 0 .5rem",
  fontWeight: 500,
  fontSize: 18,
  color: "#000000",
  fontFamily: "Poppins",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0 0 .7rem",
  border: "1px solid transparent",
}));

export default function Filter({
  children,
  summary,
  divider = true,
  direction = "horizontal",
  ...props
}: AccordionTypes) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div {...props}>
      <Accordion onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Text type="p" text={summary} weight={500} color="#06062A" />
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
      {divider && <Divider direction={direction} px="1px" />}
    </div>
  );
}
