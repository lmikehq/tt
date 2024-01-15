import * as React from "react";
import { styled } from "@mui/material/styles";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Flex from "@components/templates/flex";
import { FAQContentType } from "./content";
import { ttColors } from "@/lib/theme/colors";
import Text from "@/components/atoms/text";
import { FaCirclePlus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

interface AccordionItemProps {
    heading: string;
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
    heading,
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
                border: `1px solid ${ttColors.lightestGray}`,
                borderRadius: "0.6rem",
                overflow: 'hidden'
            }}
        >
            <AccordionSummary
                aria-controls={`${heading}-content`}
                id={`${heading}-heading`}
                sx={{
                    padding: '.8rem 1.2rem',
                    backgroundColor: 'white',
                    ' .MuiAccordionSummary-content': {
                        justifyContent: 'space-between',
                    },
                    ' .MuiAccordionSummary-expandIconWrapper': {
                        display: 'none',
                    }
                }}
            >
                <Text
                    type="p"
                    text={heading}
                    weight={500}
                />
                <Flex
                    width="min-content"
                    height="min-content"
                    background='#F3F5F6'
                    borderRadius="100%"
                    padding=".4rem"
                    styles={{ transform: expanded ? 'rotateZ(-45deg)' : ''}}
                >
                    <FiPlus color='#000' />
                </Flex>
            </AccordionSummary>
            <AccordionDetails
                style={{ padding: '1.5rem 1.8rem'}}
            >
                <Text
                    type="p"
                    text={description}
                    size={15}
                />
            </AccordionDetails>
        </Accordion>
    );
};

interface FAQAccordionProps {
    items: FAQContentType['questions'];
}
function FAQAccordion ({ items }: FAQAccordionProps) {
    const [expanded, setExpanded] = React.useState<number | null>(null);

    const handleChange = (x: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? x : null);
    };

    return (
        <Flex direction="column" gap="0.5rem">
        {items.map((item, index) => (
            <AccordionItem
                key={index}
                heading={item.q}
                description={item.a}
                expanded={expanded === index}
                onChange={handleChange(index)}
            />
        ))}
        </Flex>
    );
};

export default FAQAccordion;
