import SectionLayout from "@components/layouts/sectionLayout";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
interface layoutProps {
  children: React.ReactNode;
}

export default async function ApplyLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="countries" />
      {children}
      <FooterSection />
    </>
  );
}
