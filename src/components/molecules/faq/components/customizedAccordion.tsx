import * as React from "react";
import { styled } from "@mui/material/styles";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Flex from "src/components/atoms/flex";

interface AccordionItemProps {
  header: string;
  description: string;
}

interface AccordionItemComponentProps extends AccordionItemProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<MdOutlineArrowForwardIos size="0.9rem" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AccordionItem: React.FC<AccordionItemComponentProps> = ({
  header,
  description,
  expanded,
  onChange,
}) => {
  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    onChange(event, isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={(e) => handleChange(e, !expanded)}
      style={{
        border: "1px solid #19013b",
        borderRadius: "0.225rem",
      }}
    >
      <AccordionSummary
        aria-controls={`${header}-content`}
        id={`${header}-header`}
      >
        <Typography>{header}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

interface CustomizedAccordionsProps {
  items: AccordionItemProps[];
}

const CustomizedAccordions: React.FC<CustomizedAccordionsProps> = ({
  items,
}) => {
  const [expanded, setExpanded] = React.useState<string>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };

  return (
    <Flex direction="column" gap="0.5rem">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          header={item.header}
          description={item.description}
          expanded={expanded === item.header}
          onChange={handleChange(item.header)}
        />
      ))}
    </Flex>
  );
};

export default CustomizedAccordions;
