export const replaceHTMLSpecialCharacters = (htmlString: string) => {
    const regex =
        /<pre\s+(?:[^>]*\s+)?class="ql-syntax"(?:\s+[^>]*)?>([\s\S]*?)<\/pre>/g;
    const replacedString = htmlString.replace(regex, (match) => {
        return match.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    });
    return replacedString;
};
