"use client";
/* eslint-disable react/jsx-key */

import CustomTab from "@atom/tabs";
import { SERVICES } from "@lib/extensions/data/services";
import Flights from "./components/flight";
import Stays from "./components/stays";
import Visa from "./components/visa";
import Section from "@molecule/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

function ServiceTabs() {
  const components = [<Visa />, <Flights />, <Stays />];
  const services = SERVICES.map((service, i) => {
    return {
      value: i,
      label: service,
      content: components[i],
    };
  });
  const { isMobile } = useScreenResolution();
  return (
    <Section {...(!isMobile && { padding: "1.65rem 1.5rem" })}>
      <CustomTab tabItems={services} defaultIcons />
    </Section>
  );
}

export default ServiceTabs;
