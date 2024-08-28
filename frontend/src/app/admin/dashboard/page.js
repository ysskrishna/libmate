"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar/Sidebar';
import BookTable from '@/components/BookTable/BookTable';

const Dashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex items-center justify-center min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-xl mb-4">Search</h1>
          <BookTable />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;