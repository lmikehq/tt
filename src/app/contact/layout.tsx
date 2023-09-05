// import FooterSection from "@organism/Footer";
import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Contact us",
  description:
    "Have questions, need advice, or ready to plan your journey? Connect with Thrillers Travels. We're here to guide you every step of the way on your journey to the Western world. Let's soar on the wings of the eagle together!",
};

export default function ChatLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="dashboard" />
      {children}
      <FooterSection />
    </>
  );
}
