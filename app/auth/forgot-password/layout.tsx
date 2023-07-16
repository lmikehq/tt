import React from "react";

export const metadata = {
  title: "You forgot your password?",
  description:
    "Don’t worry, happens to all of us. Enter your email below to recover your password",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
