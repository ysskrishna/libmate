"use client";

import Sidebar from '../../components/Sidebar/Sidebar';
import BookTable from '../../components/BookTable/BookTable';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-xl mb-4">Search</h1>
        <BookTable />
      </div>
    </div>
  );
}
