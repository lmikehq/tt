import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Dashboard",
  description: "Welcome to your dashboard",
};

export default function DashboardLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="dashboard" />
      {children}
      <FooterSection />
    </>
  );
}
