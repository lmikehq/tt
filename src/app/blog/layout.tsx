import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Thrllers Travel FAQs",
  description: "Thrillers Travels Blog Section",
};

export default function PrivacyPolicyLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="blog_section" />
      {children}
      <FooterSection />
    </>
  );
}
