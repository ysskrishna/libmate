"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Role, BookFilterStatus } from '@/common/constants';
import Dropdown from '@/components/Dropdown';
import BookCard from '@/components/BookCard'; 
import CommonLayout from '@/components/Layout/commonLayout';
import { getUserHomeBooks, returnBook } from '@/redux/api/userHomeApi';
import { selectBooks, selectBookFilterStatus } from '@/redux/features/userHomeSlice';
import { getTodayDate } from '@/common/utils';


const Dashboard = () => {
  
  const dispatch = useDispatch();
  const books = useSelector(selectBooks); 
  const bookFilterStatus = useSelector(selectBookFilterStatus);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    dispatch(getUserHomeBooks(filter));
  };

  const handleReturnClick = (book) => {
    const data = [
      {
        "transaction_id": book.transaction_id,
        "return_date": getTodayDate()
      }
    ]

    dispatch(returnBook(data));
  };

  useEffect(() => {
    dispatch(getUserHomeBooks(bookFilterStatus));
  }, []);

  return (
    <CommonLayout allowedRoles={[Role.USER]}>
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <Dropdown
            name="status"
            onChange={handleFilterChange}
            className="p-2 border"
            value={bookFilterStatus}
          >
            {
              Object.keys(BookFilterStatus).map((key) => (
                <option key={key} value={BookFilterStatus[key].value}>
                  {BookFilterStatus[key].label}
                </option>
              ))
            }
          </Dropdown>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                onReturnClick={handleReturnClick}
              />
          ))}
        </div>
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
