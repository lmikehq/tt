import RTQueryClient from "@components/templates/rtqWrapper";
import React, { ReactNode } from "react";

function ApplicationWrapper({ children }: { children: ReactNode }) {
  return <RTQueryClient>{children}</RTQueryClient>;
}

export default ApplicationWrapper;
