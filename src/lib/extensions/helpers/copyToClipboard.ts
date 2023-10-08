import toast from "react-hot-toast";

export const useClipboard = () => {
  const copyToClipboard = (text: string, toastMessage: string) => {
    navigator.clipboard.writeText(text).then(() => {
      if (toastMessage) toast.success(toastMessage);
    });
  };
  return { copyToClipboard };
};
// export default copyToClipboard;
