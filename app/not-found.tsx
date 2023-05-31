import NotFound from "@image/404-icon.svg";
import Image from "@atom/image";
import SectionLayout from "@components/layouts/sectionLayout";
import Section from "@molecule/section";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import Center from "@atom/center";
function NotFoundPage() {
  return (
    <div>
      <Navbar page="not-found" />
      <SectionLayout>
        <Center>
          <Image src={NotFound} alt="not found" />
        </Center>
      </SectionLayout>
      <FooterSection />
    </div>
  );
}

export default NotFoundPage;
