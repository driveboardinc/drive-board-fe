'use client';

import { notFound } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/feature/slice/authSlice';

export function withCarrierAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithCarrierAuthComponent(props: P) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);

    if (!isAuthenticated || !user?.is_carrier) {
      notFound();
    }

    return <WrappedComponent {...props} />;
  };
}
