import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Thrllers Travel FAQs",
  description: "Frequently asked questions about Thrillers Travels",
};

export default function PrivacyPolicyLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="faqs" />
      {children}
      <FooterSection />
    </>
  );
}
