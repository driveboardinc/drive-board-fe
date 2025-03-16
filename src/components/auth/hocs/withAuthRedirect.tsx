"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import RippleLoader from "@/components/ui/loader/RippleLoader";

export function withAuthRedirect<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthRedirectComponent(props: P) {
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const auth = useSelector((state: RootState) => state.auth);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      let isMounted = true;

      const checkAuthAndRedirect = async () => {
        try {
          // Only redirect if authenticated and on a signin/signup page
          if (isAuthenticated && auth.user && pathname?.includes("/signin")) {
            const targetPath = auth.user.is_driver ? "/driver" : "/carrier";

            // Prevent redirect loop by checking current path
            if (pathname !== targetPath) {
              await router.replace(targetPath);
              return;
            }
          }
        } finally {
          if (isMounted) {
            setIsChecking(false);
          }
        }
      };

      checkAuthAndRedirect();

      return () => {
        isMounted = false;
      };
    }, [isAuthenticated, auth.user, router, pathname]);

    // Only show loader during initial check
    if (isChecking) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <RippleLoader />
        </div>
      );
    }

    // Show component only if not authenticated or not on signin/signup page
    return !isAuthenticated || !pathname?.includes("/signin") ? <WrappedComponent {...props} /> : null;
  };
}
