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
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = new Date();
  return {
    title: { default: Siteconfig.name, template: `%s - ${Siteconfig.name}` },
    description: `${currentDate.toLocaleDateString("en-US", options)} - ${
      Siteconfig.description
    }`,
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
        <Toaster position="top-center" />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
