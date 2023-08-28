import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Apply for your visa ",
  description:
    "Ready to expand your horizons and travel to your dream country? Apply for your Visa through Thrillers Travels. We simplify the process, guiding you on your journey to the Western world on eagle's wings. Your relocation starts here.",
};

export default async function ApplyLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="flight" />
      {children}
      <FooterSection />
    </>
  );
}
