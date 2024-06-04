//import { useBlogStore } from "@/lib/store/blog.store";
import React from "react";
//import { useParams } from "next/navigation";
import { BlogService } from "@/lib/services/blog/index.service";
import { Metadata, /* ResolvingMetadata */ } from "next";

export async function generateMetadata({
    params,
    // searchParams,
}: any): Promise<Metadata> {
    const blog = await BlogService.blogBySlug(params.title).then((res) => res);

    return {
        title: blog.metaDataTitle,
        description: blog.metaDataDesc,
        keywords: blog.metaKeywords,
        alternates: {
            canonical: blog.canonicalTag,
        },
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
