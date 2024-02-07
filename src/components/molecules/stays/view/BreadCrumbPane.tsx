'use client'

import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { ttColors } from "@/lib/theme/colors";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";


const BreadCrumbPane = ({ stayResponse }: { stayResponse: ViewSingleStayResponse}) => {
    const { stayTabInitialSearchQuery } = useStaySearchStore((state) => state);
    
  return (
    <Flex gap="1.5rem" padding="1.5rem 0">
      <Text type="p" size={16} weight={600} color={"#7bbbd6"} text="Home" />
      <Image
        src={"/assets/icons/arrow-right.svg"}
        alt="delete-icon"
        width={24}
        height={24}
      />
      <Text type="p" size={16} weight={600} color={"#7bbbd6"} text="Stays" />
      <Image
        src={"/assets/icons/arrow-right.svg"}
        alt="delete-icon"
        width={24}
        height={24}
      />
      <Text type="p" size={16} weight={600} color={"#7bbbd6"} text={stayResponse?.region?.name ?? stayTabInitialSearchQuery?.location?.name ?? 'Hotel'} />
      <Image
        src={"/assets/icons/arrow-right.svg"}
        alt="delete-icon"
        width={24}
        height={24}
      />
      <Text
        type="p"
        size={16}
        weight={400}
        color={ttColors.lighterGray}
        text={stayResponse?.name ?? ''}
      />
    </Flex>
  );
};

export default BreadCrumbPane;
