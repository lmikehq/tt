import Image from "@atom/image";
// import SectionLayout from "@components/templates/sectionLayout";
import SectionLayout from "@components/templates/sectionLayout";
import Section from "src/components/molecules/section";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import Center from "@components/templates/center";
function NotFoundPage() {
  return (
    <div>
      <Navbar page="not-found" />
      <SectionLayout>
        <Center>
          <Image src={"/assets/images/404-icon.svg"} alt="not found" />
        </Center>
      </SectionLayout>
      <FooterSection />
    </div>
  );
}

export default NotFoundPage;
