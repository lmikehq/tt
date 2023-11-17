import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";

const BreadCrumbPane = () => {
    return (
        <Flex gap="1.5rem" padding="29px 0 60px 0">
            <Text
                type="p"
                size={18}
                weight={600}
                color={ttColors.primary}
                text="Home"
            />
            <Image
                src={"/assets/icons/arrow-right.svg"}
                alt="delete-icon"
                width={24}
                height={24}
            />
            <Text
                type="p"
                size={18}
                weight={600}
                color={ttColors.primary}
                text="Stays"
            />
            <Image
                src={"/assets/icons/arrow-right.svg"}
                alt="delete-icon"
                width={24}
                height={24}
            />
            <Text
                type="p"
                size={18}
                weight={600}
                color={ttColors.primary}
                text="London"
            />
            <Image
                src={"/assets/icons/arrow-right.svg"}
                alt="delete-icon"
                width={24}
                height={24}
            />
            <Text
                type="p"
                size={18}
                weight={400}
                color={ttColors.lighterGray}
                text="The Ritz London"
            />
        </Flex>
    );
};

export default BreadCrumbPane;
