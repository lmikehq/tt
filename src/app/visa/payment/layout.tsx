import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Verify Payment",
  description: "Verify visa payment",
};

export default async function ApplyLayout({ children }: layoutProps) {
  return <>{children}</>;
}
