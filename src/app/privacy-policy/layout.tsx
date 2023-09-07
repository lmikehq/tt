import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Privacy Policy",
  description: "Welcome to Thrillers Travels privacy policy page",
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
