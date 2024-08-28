"use client";

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectRole, selectIsAuthenticated } from '@/redux/features/authSlice';
import { ROLE } from '@/common/constants';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const router = useRouter();
  let isAuthenticated = useSelector(selectIsAuthenticated);
  let role = useSelector(selectRole);

  if (!allowedRoles || !Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    throw new Error('allowedRoles must be a non-empty array');
  }

  useEffect(() => {
    if (!isAuthenticated) {
      //  If the user is not authenticated, they are redirected to the login page.
      router.push('/login');
    } else if (!allowedRoles.includes(role)) {
      if (role === ROLE.USER) {
        // If the user is a user, they are redirected to the user dashboard.
        router.push('/user/dashboard');
      } else if (role === ROLE.ADMIN) {
        // If the user is an admin, they are redirected to the admin dashboard.
        router.push('/admin/dashboard');
      }
    }
  }, [isAuthenticated, role, router, allowedRoles]);

  return isAuthenticated && allowedRoles.includes(role) ? children : null;
};

export default ProtectedRoute;