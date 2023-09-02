import RTQueryClient from "@components/layouts/rtqWrapper";
import React, { ReactNode } from "react";

function ApplicationWrapper({ children }: { children: ReactNode }) {
  return <RTQueryClient>{children}</RTQueryClient>;
}

export default ApplicationWrapper;
