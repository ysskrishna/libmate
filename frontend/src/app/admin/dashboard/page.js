"use client";

import BookTable from '@/components/BookTable/admin';
import CommonLayout from '@/components/Layout/commonLayout';
import { Role } from '@/common/constants';


const Dashboard = () => {
  return (
    <CommonLayout allowedRoles={[Role.ADMIN]}>
      <div className='flex-1 p-3 mb-3 overflow-y-auto'>
        <BookTable />
      </div>
    </CommonLayout>
  );
};

export default Dashboard;