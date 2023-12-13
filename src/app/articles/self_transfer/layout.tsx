// import FooterSection from "@organism/Footer";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";

interface layoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: "Self Transfer",
    description: "Learn about self transfer",
};

export default function ChatLayout({ children }: layoutProps) {
    return (
        <>
            <Navbar page="dashboard" />
            {children}
            <FooterSection />
        </>
    );
}
