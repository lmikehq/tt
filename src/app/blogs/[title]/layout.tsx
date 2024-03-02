import React from "react";

export const metadata = {
  title: "Blog page review",
  description: "Thrillers Travels Blog Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
