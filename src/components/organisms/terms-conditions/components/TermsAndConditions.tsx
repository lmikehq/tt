import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import React, { ReactNode } from "react";
import { lastUpdatedDate } from "../TermsConditionsPage";
import { ttColors } from "@/lib/theme/colors";
import CountryArticle from "@/components/molecules/countryArticle";
import { TermsOfService } from "./terms";
import styled from "styled-components";



const Article = styled.article`
    line-height: 1.8;
    color: rgb(51, 51, 51);
    font-size: 15px;
    font-weight: 400;

    ul {
        list-style-type: disc;
        padding-left: 1.5rem;

        li {
            margin-bottom: 0.5rem;
        }
    }
`;

function ListTitle({ text }: { text: string }) {
    return (
        <Text
            type="h2"
            text={text}
            weight={600}
            size={20}
            margin=" 0 0 .2rem"
        />
    );
}

function ListText({ text, margin }: { text: string; margin?: string }) {
    return (
        <p
            style={{
                lineHeight: 1.8,
                color: ttColors.darkBg,
                fontSize: "15px",
                margin: margin,
                fontWeight: 400,
            }}
            dangerouslySetInnerHTML={{ __html: text }}
        ></p>
    );
}

function TermsAndConditions() {
    return (
        <Flex direction="column" gap="1rem">
            <Flex direction="column" gap="1rem" margin=".7rem 0 2rem">
                <Text
                    type="h1"
                    text="Terms of Service - Thrillers Travels"
                    weight={700}
                    size={32}
                />
                <Text
                    type="p"
                    text={`Last Updated: ${lastUpdatedDate}`}
                    color={ttColors.lighterGray}
                />
            </Flex>

            {/* <ListItem> */}
            <ListTitle text="SERVICE AGREEMENT" />
            <ListText text="Thrillers Travels Limited, a company duly registered under the laws of Nigeria, with its principal place of business located at Address (hereinafter referred to as the “Company” or “Thrillers Travels”)," />
            <ListTitle text="RECITALS:" />
            <ListText
                text="
WHEREAS, Thrillers Travels is engaged in the business of providing visa application services, settlement planning, and related travel services; "
            />
            <ListText
                text="
AND WHEREAS, the Customer desires to engage the services of Thrillers Travels under the terms and conditions set forth herein;
 "
            />
            <ListText text="NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows: " />
            {/* </ListItem> */}
            <ol
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    fontSize: "22px",
                    fontWeight: 600,
                    margin: "0 0 0 1.1rem",
                }}
            >
                {/* <CountryArticle article={{ body: TermsOfService }} /> */}
                <Article id="blog" className="prose lg:prose-xl">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: TermsOfService,
                        }}
                    />
                </Article>
                {/* <ListItem>
                    <ListTitle text="Acceptance of Terms" />
                    <ListText text="By accessing or utilizing any service offered by Thrillers Travels, you acknowledge and agree to abide by these Terms of Service. If you disagree with any part of these terms, refrain from using our services." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Service Description" />
                    <ListText text="Thrillers Travels offers a range of travel-related services including booking accommodations, arranging transportation, travel planning, and other associated services." />
                </ListItem>
                <ListItem>
                    <ListTitle text="User Conduct" />
                    <ListText text="Users agree not to engage in activities that could compromise the security, functionality, or accessibility of our services. This includes refraining from unauthorized access, data scraping, or any activity that violates our policies." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Account Registration" />
                    <ListText text="To access certain services, users may need to register an account. Users are responsible for maintaining the confidentiality of their account credentials and are liable for all activities conducted under their account." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Booking and Payment" />
                    <ListText text="When booking through Thrillers Travels, users agree to provide accurate and up-to-date information. Payment for services is subject to the terms and conditions outlined during the booking process." />
                </ListItem>
                <ListItem>
                    <ListTitle text="User Content" />
                    <ListText text="Users may contribute content to our platform (reviews, comments, etc.). By submitting content, users grant Thrillers Travels a non-exclusive, royalty-free license to use, modify, and distribute said content." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Limitation of Liability" />
                    <ListText text="Thrillers Travels is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services, including but not limited to loss of data, profits, or business opportunities." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Modification of Services" />
                    <ListText text="Thrillers Travels reserves the right to modify, suspend, or discontinue any part of its services, including access to certain features or content, without prior notice or liability." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Governing Law" />
                    <ListText text="These Terms of Service are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions." />
                </ListItem>
                <ListItem>
                    <ListTitle text="Contact Information" />
                    <ListText text="For questions or concerns regarding these Terms of Service, please contact us at support@thrillers.travel / +2349077210321." />
                </ListItem> */}
            </ol>
        </Flex>
    );
}

export default TermsAndConditions;
