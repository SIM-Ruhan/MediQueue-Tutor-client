
import { authClient } from "@/lib/auth-client";

export const getToken = async () => {
  const { data } = await authClient.getSession();
  return data?.session?.token ?? null;
};