import AIChat from "@/components/molecules/chat/aichat";
import Navbar from "@/components/organisms/Navbar";
import UserStoreProvider from "@/lib/extensions/hook/useUserStore";

function AiGuidePage() {
  return (
    <UserStoreProvider>
      <Navbar page="ai-guide" />
      <AIChat />
    </UserStoreProvider>
  );
}

export default AiGuidePage;
