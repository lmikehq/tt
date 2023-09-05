import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Explore our supported countries",
  description:
    "Dream of traveling to the West? See the array of countries Thrillers Travels supports. We fly you on eagle's wings to your dream country. Discover more about each of these countries",
};

export default async function CountryLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="countries" />
      {children}
      <FooterSection />
    </>
  );
}
