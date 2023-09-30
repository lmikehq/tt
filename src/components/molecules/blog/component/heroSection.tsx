import Text from "@/components/atoms/text"
import Flex from "@/components/templates/flex"

export const BlogHeroSection = () => {
    return (
      <Flex direction="column" justify="center" align="center">
        <Text
          type="p"
          text="Blog Stories"
          weight={400}
          size={24}
          color="#06062A"
          styles={{ lineHeight: "36px" }}
        />

        <Text
          type="h1"
          text="ENJOY TRAVEL EXPERIENCE IN FORM OF A STORY"
          weight={700}
          size={64}
          styles={{ lineHeight: "96px" }}
            />
            
            
      </Flex>
    );
}