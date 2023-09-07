/* eslint-disable react/jsx-key */

import CustomTab from "@atom/tabs";
import { SERVICES } from "@lib/extensions/data/services";
import Flights from "./components/flight";
import Stays from "./components/stays";
import Visa from "./components/visa";

function ServiceTabs() {
  const components = [<Visa />, <Flights />, <Stays />];
  const services = SERVICES.map((service, i) => {
    return {
      value: i,
      label: service,
      content: components[i],
    };
  });
  return (
    <div>
      <CustomTab tabItems={services} defaultIcons />
    </div>
  );
}

export default ServiceTabs;
