import PopularDestinations from "@organism/popularDestination";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <PopularDestinations title="Apply to our popular countries" />
    </div>
  );
};
export default page;
