"use client";

import React, { useState } from 'react';
import sampleData from '@/sampleData';
import { ROLE } from '@/common/constants';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import Dropdown from '@/components/Dropdown';
import BookCard from '@/components/BookCard'; // Assuming the BookCard component is in the same folder

const Dashboard = () => {
  const [selectedBooks, setSelectedBooks] = useState(sampleData.AllBooks);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    if (filter === 'all') {
      setSelectedBooks(sampleData.AllBooks);
    } else if (filter === 'active') {
      setSelectedBooks(sampleData.Active);
    } else if (filter === 'pending') {
      setSelectedBooks(sampleData.Pending);
    }
  };

  const handleReturnClick = (transactionId) => {
    console.log(`Return book with transaction ID: ${transactionId}`);
    // Handle the return logic here
  };

  return (
    <ProtectedRoute allowedRoles={[ROLE.USER]}>
      <div className="flex h-screen flex-col lg:flex-row">
        <Sidebar />
         <div className="p-4">
          <div className="flex justify-between items-center mb-4">
          <Dropdown
            name="role"
            onChange={handleFilterChange}
            className="p-2 border"
          >
            <option value="all">All Books</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </Dropdown>  
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedBooks.map((book, index) => (
                <BookCard
                  key={index}
                  book={book}
                  onReturnClick={handleReturnClick}
                />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
