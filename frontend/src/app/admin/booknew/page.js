"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import { ROLE } from '@/common/constants';

const BookNew = () => {
  return (
    <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
      <div className="flex h-screen">
        <Sidebar />
        <div className='flex-1 p-3 mb-3 overflow-y-auto'>
          <div>Book New</div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookNew;