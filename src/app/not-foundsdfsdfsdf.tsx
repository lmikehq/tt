import NotFound from "@image/404-icon.svg";
import Image from "src/components/atoms/image";
import SectionLayout from "src/components/layouts/sectionLayout";
import Section from "src/components/molecules/section";
import FooterSection from "src/components/organisms/Footer";
import Navbar from "src/components/organisms/Navbar";
import Center from "src/components/atoms/center";
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
