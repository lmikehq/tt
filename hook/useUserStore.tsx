"use client";

import apiService from "hook/apiService";
import { useRouter } from "next/navigation";
import React from "react";
import { useUserStore } from "store/useStore";

function UserStoreProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useUserStore((state) => state);
  async function fetchUser() {
    if (typeof window === "undefined") return;
    if (user) return user;
    const res = (await apiService("/user")) as any;
    if (!res?._id) return router.push("/auth/login");
    setUser(res);
    return res;
  }
  fetchUser();
  return <div>{children}</div>;
}

export default UserStoreProvider;
