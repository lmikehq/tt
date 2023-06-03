import Text from "@atom/text";
import { FC } from "react";

interface SidebarButtonProps {
  title: string;
  onClick: () => void;
}

const SidebarButton: FC<SidebarButtonProps> = ({ title, onClick }) => (
  <button onClick={onClick}>{title}</button>
);

const Sidebar: FC = () => {
  const handleChatAI = () => {
    // TODO: Implement
  };

  const handleMyself = () => {
    // TODO: Implement
  };

  const handleHumanRepresentative = () => {
    // TODO: Implement
  };

  return (
    <div>
      <Text type="h2" text="Thrillers Travels AI Travel Guide"/>
      <Text type="p" text="First AI powered travel consultant" />
      <input type="search" placeholder="Search" />
      <SidebarButton title="Chat with Company AI" onClick={handleChatAI} />
      <SidebarButton title="Myself" onClick={handleMyself} />
      <SidebarButton
        title="Human Representative"
        onClick={handleHumanRepresentative}
      />
    </div>
  );
};

export default Sidebar;
