import * as React from "react";
import { styled } from "@mui/material/styles";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails, { AccordionDetailsProps } from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Flex from "@components/templates/flex";
import { usePathname } from "next/navigation";


interface AccordionItemProps {
  header: string;
  description: string | React.ReactNode;
  border?: string;
  flexDirection?: string;
  headerFontWeight?: number;
  backgroundColor?: string;
  detailsBorderTop?: string;
  detailsPadding?: number;
  headerLeftMargin?: number;
  headerPadding?: string;
  defaultExpanded?: boolean;
}

interface AccordionItemComponentProps extends AccordionItemProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

interface CustomAccordionSummaryProps extends AccordionSummaryProps {
  flexDirection?: string;
  backgroundColor?: string;
  marginLeft?: number;
  padding?: string;
}

interface CustomAccordionDetailsProps extends AccordionDetailsProps {
  borderTop?: string;
  padding?: number;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} expanded={props.expanded} defaultExpanded={props.defaultExpanded} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: CustomAccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<MdOutlineArrowForwardIos size="0.9rem" />}
    {...props}
  />
))(({ theme, flexDirection, backgroundColor, marginLeft, padding }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : backgroundColor,
  flexDirection: flexDirection === 'row' ? `${flexDirection}` : "row-reverse",
  padding: padding,
  marginLeft: marginLeft === 0 ? marginLeft : "8px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: padding
  },
}));

const AccordionDetails = styled((props: CustomAccordionDetailsProps) => (
  <MuiAccordionDetails {...props} />
))(({ theme, borderTop, padding }) => ({
  padding: theme.spacing(padding !== undefined ? padding : 2),
  borderTop: borderTop && borderTop?.length > 1 ? borderTop : "1px solid rgba(0, 0, 0, .125)"
}));

const AccordionItem: React.FC<AccordionItemComponentProps> = ({
  header,
  description,
  expanded,
  onChange,
  flexDirection,
  border,
  headerFontWeight,
  headerLeftMargin,
  headerPadding,
  detailsBorderTop,
  detailsPadding,
  defaultExpanded
}) => {
  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    onChange(event, isExpanded);
  };


  return (
    <Accordion
      defaultExpanded={defaultExpanded && expanded}
      expanded={expanded}
      onChange={(e) => handleChange(e, !expanded)}
      style={{
        border: border ? border : "1px solid #19013b",
        borderRadius: "0.225rem",
      }}
    >
      <AccordionSummary
        aria-controls={`${header}-content`}
        id={`${header}-header`}
        flexDirection={flexDirection}
        marginLeft={headerLeftMargin}
        padding={headerPadding}
      >
        <Typography fontWeight={headerFontWeight} fontFamily={"poppins"}>{header}</Typography>
      </AccordionSummary>
      <AccordionDetails borderTop={detailsBorderTop} padding={detailsPadding}>
        <Typography>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

interface CustomizedAccordionsProps {
  items: AccordionItemProps[];
  hasDefaultExpanded?: boolean;
}

const CustomizedAccordions: React.FC<CustomizedAccordionsProps> = ({
  items,
  hasDefaultExpanded
}) => {
  const [expanded, setExpanded] = React.useState<string>("Dependant");

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
          flexDirection={item.flexDirection || "row-reverse"}
          expanded={expanded === item.header}
          onChange={handleChange(item.header)}
          border={item.border || "1px solid #19013b"}
          headerFontWeight={item.headerFontWeight || 400}
          headerLeftMargin={item.headerLeftMargin ? item.headerLeftMargin : 0}
          headerPadding={item.headerPadding || "0 16px"}
          backgroundColor={item.backgroundColor || "rgba(0, 0, 0, .03)"}
          detailsBorderTop={item.detailsBorderTop || "1px solid rgba(0, 0, 0, .125)"}
          detailsPadding={item.detailsPadding}
          defaultExpanded={hasDefaultExpanded && index == 0}
        />
      ))}
    </Flex>
  );
};

export default CustomizedAccordions;
