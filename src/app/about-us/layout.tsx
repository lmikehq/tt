// import FooterSection from "@organism/Footer";
import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Get more information about us",
  description:
    "For more information about us, you can contact us through our social media handles or through our contact page.",
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
