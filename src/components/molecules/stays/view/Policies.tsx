import Text from "@/components/atoms/text";
import { Container, GridLayout, Header, Span } from "./styles";
import Flex from "@/components/templates/flex";
import { Metapolicy, ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { pickIcon } from "./modals/components/AmenitiesBox";
import React, { CSSProperties, useMemo } from "react";
import { capCase } from "@/lib/utilFns";


export const pickPaymentIcon = (val: string, styles?: CSSProperties ) => {
    switch (String(val).toLowerCase()) {
        case 'visa': return "/assets/images/stays/visa.png";
        case 'american express': return "/assets/images/stays/express.png";
        case 'mastercard': return "/assets/images/stays/master.png";
        case 'diners club': return "/assets/images/stays/dinners.png";
        case 'jcb': return "/assets/images/stays/jcb.jpeg";
        default: return "/assets/images/stays/master.png";
    }
}

interface PolicySectionProps {
    title?: string;
    items: string[];
    icon?: string;
}

function PolicySection({ title, items, icon }: PolicySectionProps) {
    console.log('itt', items)
    return (
        <ul>
            {title &&
                <Text
                    type="h5"
                    text={capCase(title, '_')}
                    weight={"bold"}
                />
            }
            <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: ".5rem", color: "var(--text-gray-color)" }}
            >
                {pickIcon(icon ?? title ?? '', { fontSize: "16px", position: "relative", top: "4px" })}
                <Flex direction="column" gap=".3rem">
                    {items.length === 0 ? (
                        <Text
                            type="p"
                            size={14}
                            text='Not Included'
                        />
                    ) : items.filter(i => typeof i === 'string').map((item, index) =>
                        <li key={`policy-item-${index}`} style={{ listStyleType: 'none' }}>
                            <Text
                                type="p"
                                size={14}
                                text={item}
                            />
                        </li>
                    )}
                </Flex>
            </Flex>
        </ul>
    )
}

interface PoliciesProps {
    stayResponse?: ViewSingleStayResponse;
}

const Policies = ({ stayResponse }: PoliciesProps) => {
    const sortedPolicies = useMemo(() => {
        return Object.keys(stayResponse?.metapolicy_struct ?? {}).map((key) => {
            const value = stayResponse?.metapolicy_struct[key as keyof Metapolicy]
            if (Array.isArray(value) && value.length > 0) {
                return ({ title: key, items: Object.keys(value[0]).map(e => `${capCase(e, '_')} - ${capCase(value[0][e], '_')}`) })
            } else if (value) {
                return ({
                    title: key,
                    items: Object.keys(value).map(e => `${capCase(e, "_")} - ${value[e as keyof typeof value] ? capCase(value[e as keyof typeof value]) : 'Unspecified'}`)
                })
            }
        }) ?? []
    }, [stayResponse?.metapolicy_struct])


    return (
        <Container style={{ padding: "25px" }}>
            <Span>
                <Header id="policies">
                    <Text
                        type="h4"
                        weight={"bold"}
                        text="Policies"
                    />
                </Header>
                <GridLayout style={{ justifyContent: "space-between", rowGap: '1rem' }}>
                    {sortedPolicies.filter(e => e?.items && e?.items.length > 0).map((section, index) =>
                        <PolicySection
                            key={`pol-${section?.title}-${index}`}
                            title={section?.title}
                            items={section?.items ?? []}
                        />
                    )}
                </GridLayout>
            </Span>
            <Span style={{ marginTop: "30px" }}>
                {stayResponse?.payment_methods && stayResponse?.payment_methods.length > 0 && 
                    <React.Fragment>
                        <Header>
                            <Text
                                type="h4"
                                size={15}
                                weight={"bold"}
                                text="Payment"
                            />
                        </Header>
                        <Flex gap="20px" align="center" wrap="wrap" margin="0 0 20px">
                            {stayResponse?.payment_methods.map((payment, index) => 
                                <img
                                    key={`payment-${index}`}
                                    style={{ maxWidth: "40px", maxHeight: "40px" }}
                                    src={pickPaymentIcon(payment)}
                                    alt=""
                                />
                            )}
                        </Flex>
                    </React.Fragment>
                }
                {stayResponse?.metapolicy_extra_info && 
                    <Span>
                        <PolicySection
                            title="Additional Information"
                            icon="additional"
                            items={[]}
                        />
                    </Span>
                }
            </Span>
        </Container>
    );
};

export default Policies;
