import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";
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
