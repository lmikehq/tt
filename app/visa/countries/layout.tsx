import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export default async function CountryLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="countries" />
      {children}
      <FooterSection />
    </>
  );
}
