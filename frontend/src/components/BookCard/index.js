"use client";

const BookCard = ({ book, onReturnClick }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-bold">{book.book.title}</h3>
      <p>Borrowed on: {book.collected_date}</p>
      {book.return_date ? (
        <p>Return Date: {book.return_date}</p>
      ) : (
        <>
          <p>Submission Due: {book.due_date}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2"
            onClick={() => onReturnClick(book.transaction_id)}
          >
            Return
          </button>
        </>
      )}
    </div>
  );
};

export default BookCard;
