"use client";
/* eslint-disable react/jsx-key */

import CustomTab from "@atom/tabs";
import { SERVICES } from "@lib/extensions/data/services";
import Flights, { FlightType } from "./components/flight";
import Stays from "./components/stays";
import Visa from "./components/visa";
import Section from "@molecule/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useContext, useState } from "react";
import { FlightContext } from "@/lib/extensions/context";
import Flex from "@/components/templates/flex";
import { usePathname, useRouter } from "next/navigation";

function ServiceTabs({ page }: { page?: string }) {
  const { isMobile } = useScreenResolution();
  const flightContext = useContext(FlightContext);
  const flightState = flightContext?.state,
    dispatch = flightContext?.dispatch;

  const components = [<Visa />, <Flights />, <Stays />];
  const services = SERVICES.map((service, i) => ({
    value: i,
    label: service,
    content: components[i],
  }));

  const path = usePathname();
  const [activeTab, setActiveTab] = useState(
    {
      "/visa": 0,
      "/flight": 1,
      "/stay": 2,
    }[path]
  );

  console.log("Path:", path);
  console.log("Active Tab:", activeTab);
  return (
    <Section {...(!isMobile && { padding: "1.5rem 2rem" })}>
      <CustomTab
        tabItems={services}
        defaultIcons
        activeTab={activeTab}
        setActiveTab={(activeTab) => setActiveTab(activeTab)}
      />
      {activeTab === 1 && !isMobile && (
        <Flex
          styles={{
            position: "absolute",
            top: "30px",
            right: "24px",
            width: "max-content",
          }}
        >
          <FlightType
            isMobile={isMobile}
            value={flightState?.flightType ?? ""}
            onChange={(x) =>
              dispatch &&
              dispatch({ type: "SET_FLIGHT_TYPE", payload: x ?? "" })
            }
          />
        </Flex>
      )}
    </Section>
  );
}

export default ServiceTabs;
