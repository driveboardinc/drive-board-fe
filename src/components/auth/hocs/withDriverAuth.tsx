"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ROUTE } from "@/constants/ROUTE";

export function withDriverAuth<T extends object>(Component: React.ComponentType<T>) {
  return function ProtectedRoute(props: T) {
    const router = useRouter();
    const { accessToken } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!accessToken) {
        router.replace(ROUTE.DRIVER.SIGNIN);
      }
    }, [accessToken, router]);

    if (!accessToken) {
      return null; // or a loading spinner
    }

    return <Component {...props} />;
  };
}
