"use client";

import React, { useState } from 'react';
import sampleData from '@/sampleData';
import { ROLE } from '@/common/constants';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import BookCard from '@/components/BookCard'; // Assuming the BookCard component is in the same folder

const Cart = () => {
  const [selectedBooks, setSelectedBooks] = useState(sampleData.AllBooks);

  return (
    <ProtectedRoute allowedRoles={[ROLE.USER]}>
      <div className="flex h-screen flex-col lg:flex-row">
       <Sidebar />
        <div className="p-4">
             <div className="flex justify-between items-center mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedBooks.map((book, index) => (
                    <BookCard
                      key={index}
                      book={book}
                    />
                ))}
              </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Cart;