// import FooterSection from "@organism/Footer";
import Navbar from "src/components/organisms/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Engage, Explore, Enlighten: AI Chat and Travel Guide",
  description:
    " Utilize our intelligent AI to learn about any country of your choice, engage with our dedicated customer support, or simply chat with yourself! Exploring the world has never been this interactive. Connect with us and soar on the wings of the eagle",
};

export default function ChatLayout({ children }: layoutProps) {
  return (
    <>
      <Navbar page="dashboard" />
      {children}
    </>
  );
}
