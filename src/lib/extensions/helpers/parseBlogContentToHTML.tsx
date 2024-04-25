export const replaceHTMLSpecialCharacters = (htmlString: string) => {
    const regex =
        /<pre\s+(?:[^>]*\s+)?class="ql-syntax"(?:\s+[^>]*)?>([\s\S]*?)<\/pre>/g;
    const replacedString = htmlString.replace(regex, (match) => {
        return match.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    });
    return replacedString;
};

export const extractScripts = (htmlString: string) => {
    const scriptTag = /<script[^>]*>([\s\S]*?)<\/script>/g;
    let scripts: string[] = [];
    const replaced = htmlString.replace(scriptTag, (match) => {
        scripts = [...scripts, match];
        return "";
    });

    const pattern: RegExp = /<script.*?src="(.*?)".*?>/;

    const srcs: string[] = [];

    scripts.forEach((scriptTag) => {
        const matches: RegExpMatchArray | null = scriptTag.match(pattern);

        if (matches && matches.length > 1) {
            const srcValue: string = matches[1];
            srcs.push(srcValue);
        }
    });

    return { replaced, srcs };
};
