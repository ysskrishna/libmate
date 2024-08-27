"use client";

import ProtectedRoute from '@/components/ProtectedRoute';

const Cart = () => {
  return (
    <ProtectedRoute allowedRoles={['user']}>
      <h1>User Cart</h1>
    </ProtectedRoute>
  );
};

export default Cart;