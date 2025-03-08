'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/store/slice/authSlice';
import RippleLoader from '@/components/ui/loader/RippleLoader';

export function withAuthRedirect<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthRedirectComponent(props: P) {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      if (isAuthenticated) {
        // Redirect based on user role
        if (user?.is_carrier) {
          router.push('/carrier/dashboard');
        } else {
          router.push('/');
        }
      }
      setIsChecking(false);
    }, [isAuthenticated, user, router]);

    if (isChecking) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <RippleLoader />
        </div>
      );
    }

    // Only render the component if user is not authenticated
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
}
