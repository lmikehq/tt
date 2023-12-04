import React, { useState } from 'react'
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledAccordion } from '../applicationPreview';
import { Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { DetailsKeys, PersonalInfoInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';

// function MyAccordion({ toggle, isOpen, heading, subHeading,  }) {
//     return (
//         <StyledAccordion
//             onChange={(e, isExpanded) => toggleAcc(0)}
//             expanded={isOpenAcc === 0}
//         >
//             <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="flight-details-content"
//                 id="flight-details-header"
//             >
//                 <Text
//                     type="p"
//                     weight={500}
//                     size={16}
//                     text="Trip Details"
//                 />
//             </AccordionSummary>
//             <AccordionDetails style={{ padding: "0" }}>
//                 <Flex>
//                     <Detail name="Where are you?" value={applicationDetails?.homeCountry?.name ?? ""} />
//                     <Detail name="Where to?" value={applicationDetails?.destination?.name ?? ""} />
//                     <Detail name="Visa Type" value={applicationDetails?.visaType} />
//                     <Detail name="Application Type" value={applicationDetails?.applicationType} />
//                 </Flex>
//             </AccordionDetails>
//         </StyledAccordion>
//     )
// }

interface OneProps{
    personalInfo: PersonalInfoInterface;
    applicationDetails: DetailsKeys;
}

function One({ applicationDetails, personalInfo }: OneProps) {
    const [isOpenAcc, setOpenAcc] = useState<number | null>(0)
    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='4rem 2rem 1rem' gap="1rem" overflowY="scroll" className='scroll-custom'>
            <Stack direction="row" position="fixed" top="50px">
                <Text
                    text={`Visa Application Preview (1/5)`}
                    type="h2"
                    weight={600}
                />
            </Stack>

            <StyledAccordion
                onChange={(e, isExpanded) => toggleAcc(0)}
                expanded={isOpenAcc === 0}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="flight-details-content"
                    id="flight-details-header"
                >
                    <Flex direction='column' gap=".5rem">
                        <Text
                            type="p"
                            weight={600}
                            size={16}
                            text="Trip Details"
                        />
                    </Flex>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "0" }}>
                    <Flex>
                        <Detail name="Where are you?" value={applicationDetails?.homeCountry?.name ?? ""} />
                        <Detail name="Where to?" value={applicationDetails?.destination?.name ?? ""} />
                        <Detail name="Visa Type" value={applicationDetails?.visaType} />
                        <Detail name="Application Type" value={applicationDetails?.applicationType} />
                    </Flex>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion
                onChange={(e, isExpanded) => toggleAcc(1)}
                expanded={isOpenAcc === 1}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="flight-details-content"
                    id="flight-details-header"
                >
                    <Flex direction='column' gap=".5rem">
                        <Text
                            type="p"
                            weight={600}
                            size={16}
                            text="Personal Details"
                        />
                        <Text
                            type="p"
                            size={14}
                            text="Please ensure the Information you are providing is as shown on your passport or Travel Document"
                        />
                    </Flex>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "0" }}>
                    <Flex width='100%' direction='row' wrap="wrap" gap="1rem">
                        <Detail name="Last Name" value={personalInfo?.lastName} width='50%' />
                        <Detail name="First Name" value={personalInfo?.firstName} width='50%' />
                        <Detail name="Have you previously changed or used any surname or given names apart from the one provided above?" value={personalInfo?.changeOfName ? "Yes" : "No"} width='100%' />
                        <Detail name="Middle Name" value={personalInfo?.firstName} width='50%' />
                        <Detail name="State of Origin" value={personalInfo?.firstName} width='50%' />
                    </Flex>
                </AccordionDetails>
            </StyledAccordion>


        </Flex>
    )
}

export default One