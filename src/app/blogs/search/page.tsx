import BlogResults from "@/components/organisms/blog/BlogResults";
import SectionLayout from "@/components/templates/SectionLayout";

const ResultPage = () => {
    return (
        <SectionLayout>
            <BlogResults blogs={[]} />
        </SectionLayout>
    );
};

export default ResultPage;
