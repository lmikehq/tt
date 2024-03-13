import "../../styles/article.css";
interface Props {
    article: {
        body: string;
    };
}

const CountryArticle = ({ article }: Props) => {
    return (
        <>
            <article id="blog" className="prose lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </article>
        </>
    );
};

export default CountryArticle;
