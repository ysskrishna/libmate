"use client";

import BookTable from '@/components/BookTable/user';
import CommonLayout from '@/components/Layout/commonLayout';
import { Role } from '@/common/constants';

const Search = () => {
  return (
    <CommonLayout allowedRoles={[Role.USER]}>
      <div className='flex-1 p-3 mb-3 overflow-y-auto'>
        <BookTable />
      </div>
    </CommonLayout>
  );
};

export default Search;