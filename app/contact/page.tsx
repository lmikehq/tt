import SectionLayout from "@components/layouts/sectionLayout";
import ContactPage from "@molecule/contactPage";
import Section from "@molecule/section";

const Contact = () => {
    return (
        <Section>
            <SectionLayout>
                <ContactPage />
            </SectionLayout>
        </Section>
    )
}

export default Contact;