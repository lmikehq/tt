import FooterSection from "@organism/Footer";
import VisaHero from "@organism/hero/visa";

interface layoutProps {
  children: React.ReactNode;
}

export default async function VisaLayout({ children }: layoutProps) {
  return (
    <main>
      <VisaHero />
      {children}
      <FooterSection />
    </main>
  );
}
