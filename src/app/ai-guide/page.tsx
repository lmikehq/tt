import AIChat from "@/components/molecules/chat/aichat";
import Navbar from "@/components/organisms/Navbar";

function AiGuidePage() {
  return (
    <div>
      <Navbar page="ai-guide" />
      <AIChat />
    </div>
  );
}

export default AiGuidePage;
