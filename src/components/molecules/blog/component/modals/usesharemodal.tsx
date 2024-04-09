import { useState } from "react";

export default function useShareModal() {
  const [hasCopiedValue, setHasCopiedValue] = useState(false);

  async function handleClick(content: string) {
    if (hasCopiedValue) return;
    try {
      await navigator.clipboard.writeText(content);
      setHasCopiedValue(true);
      setTimeout(() => {
        setHasCopiedValue(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  return { handleClick, hasCopiedValue };
}