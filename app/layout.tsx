import StyledComponentsRegistry from "@lib/registry";
import LoaderLayout from "@organism/Loader/layout";
import PaymentConfirmationModal from "@organism/paymentConfirmationModal";
import "@style/globals.css";
import "react-phone-input-2/lib/style.css";

import { Siteconfig } from "config/site";
import { Poppins } from "next/font/google";
import Script from "next/script";
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
    description: `Today - ${Siteconfig.description}`,
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
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Script strategy="lazyOnload" id="crisp-chat">
        {`
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '6111d110-e09c-4dbe-a69b-a6ea385b8dfa';
    
    (function () {
      var d = document;
      var s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  `}
      </Script>

      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <Toaster position="top-center" />
        <PaymentConfirmationModal />
        <StyledComponentsRegistry>
          <LoaderLayout>{children}</LoaderLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
