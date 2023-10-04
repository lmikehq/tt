import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";

const FormTitleAndSubtitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <Section>
      <Text
        type="h1"
        text={title}
        size={24}
        weight={600}
        styles={{ marginBottom: ".75rem" }}
      />
      <Text type="p" color="#606060" size={16} text={subTitle} />
    </Section>
  );
};

export default FormTitleAndSubtitle;
