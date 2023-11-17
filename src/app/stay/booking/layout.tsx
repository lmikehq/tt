import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export default function ApplyLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="stay/booking" />
      {children}
      <FooterSection />
    </>
  );
}
