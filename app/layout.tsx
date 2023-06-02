import StyledComponentsRegistry from "@lib/registry";
import "@style/globals.css";
import { Siteconfig } from "config/site";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: "100",
  style: ["normal"],
  display: "swap",
  subsets: ["latin-ext"],
});

export const generateMetadata = () => {
  return {
    title: { default: Siteconfig.name, template: `%s - ${Siteconfig.name}` },
    description: Siteconfig.description,
    keywords: Siteconfig.keywords,
    themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
    viewport: "width=device-width, initial-scale=1",
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.className}>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <Toaster />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
