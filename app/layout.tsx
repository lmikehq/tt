import { Siteconfig } from "config/site";
import "@style/globals.css";
import StyledComponentsRegistry from "@lib/registry";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
