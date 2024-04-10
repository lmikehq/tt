import { replaceHTMLSpecialCharacters } from "@/lib/extensions/helpers/parseBlogContentToHTML";
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
                <div
                    dangerouslySetInnerHTML={{
                        __html: replaceHTMLSpecialCharacters(article.body),
                    }}
                />
            </article>
        </>
    );
};

export default CountryArticle;
