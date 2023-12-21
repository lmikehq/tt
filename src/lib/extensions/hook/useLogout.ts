import { toast } from "react-hot-toast";
import apiService from "./apiService";
import sleep from "@lib/extensions/helpers/sleep";

import Cookies from "js-cookie";

export async function handleLogout() {
  try {
    await apiService("/auth/logout", "POST");

    Cookies.remove("Authentication");

    toast.success("You have been logged out!");
    await sleep(3000);
    toast.loading("Redirecting to login page...", {
      duration: 3000,
    });
    await sleep(500);

    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
