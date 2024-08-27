"use client";

import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  );
};

export default Dashboard;