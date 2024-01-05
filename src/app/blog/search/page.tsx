import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import BlogTab from "@/components/atoms/blogTab";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { BlogArticleMini } from "@/components/molecules/blog/component/blogArticleMini";
import { BlogArticle } from "@/components/molecules/blog/component/blogArticle";
import { RelatedTopic } from "@/components/molecules/blog/component/relatedTopic";

function ResultPage() {
  const { isMobile } = useScreenResolution();

  const tabItems = [
    {
      label: "For You",
      value: 0,
      content: "",
    },
    {
      label: "About Thrillers",
      value: 1,
      content: "",
    },

    {
      label: "Visa Application",
      value: 2,
      content: "",
    },

    {
      label: "Flight",
      value: 3,
      content: "",
    },
    {
      label: "Stays",
      value: 4,
      content: "",
    },
  ];

  return (
    <>
      <Flex gap="50px" direction={isMobile ? "column" : "row"}>
        <Flex direction="column" width={isMobile ? "100%" : "65%"} gap="2rem">
          <BlogTab tabItems={tabItems} addColor width={true} />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
          <br />

          <BlogArticleMini />
        </Flex>

        <Flex width={isMobile ? "100%" : "40%"} direction="column" justify="flex-start" gap="3.5rem">
          <Flex direction="column" gap="3rem">
            <Text
              type="h2"
              text="Similar Blog Post"
              size="20px"
              weight={600}
              styles={{
                justifyContent: "center",
                alignContent: "center",
              }}
            />

            <BlogArticle />
            <BlogArticle />
            <BlogArticle />
            <BlogArticle />
            <BlogArticle />
          </Flex>
          <RelatedTopic />
        </Flex>
      </Flex>
    </>
  );
};
export default ResultPage;