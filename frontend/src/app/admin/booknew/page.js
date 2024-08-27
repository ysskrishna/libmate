"use client";

import ProtectedRoute from '@/components/ProtectedRoute';

const BookNew = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <h1>Admin Book New</h1>
    </ProtectedRoute>
  );
};

export default BookNew;