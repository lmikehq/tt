import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Thrllers Travel Blog Page",
  description: "Thrillers Travels Blog Page",
};

export default function BlogLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="blog_section" />
      {children}
      <FooterSection />
    </>
  );
}
