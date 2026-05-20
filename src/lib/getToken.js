// lib/getToken.js
import { authClient } from "@/lib/auth-client"; // adjust path if needed

export const getToken = async () => {
  const { data } = await authClient.getSession();
  return data?.session?.token ?? null;
};