import Text from "@/components/atoms/text";
import FormTitleAndSubtitle from "@/components/molecules/forms/FormTitleAndSubtitle";
import Flex from "@/components/templates/flex";

export const OverviewHeader = () => {
  return (
    <FormTitleAndSubtitle
      title={"Trip Overview & Payment"}
      subTitle={"Make payment for your flight booking"}
    />
  );
};

export const SeatHeader = () => {
  return (
    <FormTitleAndSubtitle
      title={"Seat Selection"}
      subTitle={"Select a seat of your choice"}
    />
  );
};
