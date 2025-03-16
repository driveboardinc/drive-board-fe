import { cookies } from "next/headers";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    return null;
  }

  return {
    accessToken: token.value,
  };
}
