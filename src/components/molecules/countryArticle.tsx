import {
    extractScripts,
    replaceHTMLSpecialCharacters,
} from "@/lib/extensions/helpers/parseBlogContentToHTML";
import "../../styles/article.css";
import { useEffect } from "react";
interface Props {
    article: {
        body: string;
    };
}

const CountryArticle = ({ article }: Props) => {
    let removeSpecialCharacters = replaceHTMLSpecialCharacters(article.body);
    const { replaced, srcs } = extractScripts(removeSpecialCharacters);
    if (srcs) {
        srcs.forEach((element) => {
            removeSpecialCharacters = removeSpecialCharacters.replace(
                element,
                ""
            );
        });
    }
    useEffect(() => {
        srcs?.forEach((element) => {
            let scriptElement = document.createElement("script");
            scriptElement.src = element;
            document.head.appendChild(scriptElement);
        });
    }, []);

    return (
        <>
            <article id="blog" className="prose lg:prose-xl">
                <div
                    dangerouslySetInnerHTML={{
                        __html: replaced.replaceAll('<img ', '<img alt="blog image" '),
                    }}
                />
            </article>
        </>
    );
};

export default CountryArticle;
