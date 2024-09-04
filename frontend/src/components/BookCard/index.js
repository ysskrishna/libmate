"use client";

import Button from '@/components/Button';

const BookCard = ({ book, onReturnClick }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-bold">{book?.book?.title}</h3>
      <p>Borrowed on: {book?.collected_date}</p>
      {book.return_date ? (
        <p>Return Date: {book?.return_date}</p>
      ) : (
        <>
          <p className="mb-2">Submission Due: {book?.due_date}</p>
          <Button 
            buttonContainerClassName="!bg-red-100 !text-red-600 hover:!bg-red-200"
            onClick={() => onReturnClick(book)}
          >
            Return
          </Button>
        </>
      )}
    </div>
  );
};

export default BookCard;
