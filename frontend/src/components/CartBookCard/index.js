"use client";

import { useDispatch } from 'react-redux';
import { deleteBookFromCart } from '@/redux/features/userCartSlice';
import Button from '@/components/Button';

const CartBookCard = ({ book }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-start bg-white shadow-md rounded-lg p-3 w-full mx-auto flex-grow">
      <h2 className="text-xl font-semibold text-gray-800">{book?.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{book?.description}</p>
      <p className="text-sm text-gray-500">Published: {book?.publish_date}</p>
      <p className="text-sm text-gray-500">Borrowed From: {book?.fromDate}</p>
      <p className="text-sm text-gray-500">Due Date: {book?.toDate}</p>

      <Button 
        onClick={() => dispatch(deleteBookFromCart({book_id:book.book_id}))}
        buttonContainerClassName="!bg-red-100 !text-red-600 hover:!bg-red-200 mt-2"
      >
        Remove
      </Button>
    </div>
  );
};

export default CartBookCard;