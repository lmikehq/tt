import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Thrllers Travel FAQs",
  description: "Welcome to Thrllers Travel FAQs page",
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
