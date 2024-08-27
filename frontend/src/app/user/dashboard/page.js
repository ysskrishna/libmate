"use client";

import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['user']}>
      <h1>User Dashboard</h1>
    </ProtectedRoute>
  );
};

export default Dashboard;