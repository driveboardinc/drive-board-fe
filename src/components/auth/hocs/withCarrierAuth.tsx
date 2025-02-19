'use client';

import { notFound, redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsLoggingOut,
} from '@/store/slice/authSlice';

export function withCarrierAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithCarrierAuthComponent(props: P) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);
    const isLoggingOut = useSelector(selectIsLoggingOut);

    if (!isAuthenticated || !user?.is_carrier) {
      if (isLoggingOut) {
        redirect('/carrier/signin');
      }
      notFound();
    }

    return <WrappedComponent {...props} />;
  };
}
