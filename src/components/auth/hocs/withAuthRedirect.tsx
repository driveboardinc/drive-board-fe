'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/feature/slice/authSlice';

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
          router.push('/carrier/dashboard'); // Adjust the path as needed
        } else {
          router.push('/dashboard'); // Default dashboard for non-carrier users
        }
      }
      setIsChecking(false);
    }, [isAuthenticated, user, router]);

    if (isChecking) {
      return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    // Only render the component if user is not authenticated
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
}
