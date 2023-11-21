import React from "react";

export const metadata = {
  title: "Blog page search result",
  description: "Thrillers Travels Blog Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
