import { toast } from "react-hot-toast";
import apiService from "./apiService";
import sleep from "@lib/extensions/helpers/sleep";
import { useUserStore } from "@/lib/store/useStore";

export async function handleLogout() {
    const res = await apiService("/auth/logout", "POST");
    toast.success("You have been logged out!");
}
