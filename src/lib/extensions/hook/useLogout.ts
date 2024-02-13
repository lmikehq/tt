import { toast } from "react-hot-toast";
import apiService from "./apiService";
import sleep from "@lib/extensions/helpers/sleep";
import { useUserStore } from "@/lib/store/useStore";

export async function handleLogout() {
  const res = await apiService("/auth/logout", "POST");
  toast.success("You have been logged out!");
  await sleep(3000);
  toast.loading("Redirecting to login page...", {
    duration: 3000,
  });
  await sleep(500);
}
