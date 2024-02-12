import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Book your flights",
  description: "Book your flights here",
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
