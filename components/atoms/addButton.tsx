import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { ttColors } from "theme/colors";

interface buttonProps {
  onClick: (event: any) => void;
}

export default function AddButton({ onClick }: buttonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <AiFillPlusCircle
      size={30}
      onClick={onClick}
      cursor="pointer"
      color={isHovered ? ttColors.primary : ttColors.gray}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
