"use client";

import AIChat from "@/components/molecules/chat/aichat";
import Navbar from "@/components/organisms/Navbar";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import UserStoreProvider from "@/lib/extensions/hook/useUserStore";

function AiGuidePage() {
  const { isMobile } = useScreenResolution();
  return (
    <UserStoreProvider>
      {!isMobile && <Navbar page="ai-guide" />}
      <AIChat />
    </UserStoreProvider>
  );
}

export default AiGuidePage;
