import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Terms and Conditions",
  description: "Welcome to Thrillers Travels Terms and Conditions page",
};

export default function PrivacyPolicyLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="privacy" />
      {children}
      <FooterSection />
    </>
  );
}
