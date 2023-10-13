import React from "react";

export const metadata = {
  title: "AI Travel Guide",
  description:
    "Chat with our AI to learn more about any country in the world, and get recommendations on preparations, places to visit, and more.",
  keywords: 'ai, travel, guide, "travel guide", "ai travel guide"',
};

function AiGuideLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default AiGuideLayout;
