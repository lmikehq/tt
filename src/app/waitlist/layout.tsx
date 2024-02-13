// import FooterSection from "@organism/Footer";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Join the waitlist at Thrillers Travels",
  description:
    "Join the waitlist at Thrillers Travels. The first step on your journey to the western world.",
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
