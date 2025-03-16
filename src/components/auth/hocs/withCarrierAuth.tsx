"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ROUTE } from "@/constants/ROUTE";

export function withCarrierAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithCarrierAuthComponent(props: P) {
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);

    console.log("WithCarrierAuth HOC - Auth State:", {
      isAuthenticated: auth.isAuthenticated,
      accessToken: auth.accessToken,
      user: auth.user,
    });

    useEffect(() => {
      if (!auth.isAuthenticated || !auth.accessToken) {
        console.log("Not authenticated, redirecting to signin");
        router.push(ROUTE.CARRIER.SIGNIN);
      }
    }, [auth.isAuthenticated, auth.accessToken, router]);

    if (!auth.isAuthenticated || !auth.accessToken) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
