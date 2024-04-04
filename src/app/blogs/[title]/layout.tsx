import { useBlogStore } from "@/lib/store/blog.store";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { BlogService } from "@/lib/services/blog/index.service";
import { Metadata, ResolvingMetadata } from "next";

// export const metadata = {
//     title: "Blog page review",
//     description: "Thrillers Travels Blog Page",
// };

type Props = {
    params: { title: string };
    searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    console.log("paramis", params);
    const blog = await BlogService.blogBySlug(params.title).then((res) => res);
    console.log("paramis", blog);

    return {
        title: blog.metaDataTitle,
        description: blog.metaDataDesc,
        keywords: blog.metaKeywords,
        alternates: {
            canonical: blog.canonicalTag,
        },
    };
    // : {
    //       title: "blog.metaDataTitle",
    //       description: " blog.metaDataDesc",
    //   };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
