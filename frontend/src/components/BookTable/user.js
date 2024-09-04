"use client";

import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FaCartPlus, FaMinus } from 'react-icons/fa';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks } from '@/redux/features/booksSlice';
import { selectCartBooks, deleteBookFromCart } from '@/redux/features/userCartSlice';
import { getAllBooks } from '@/redux/api/booksApi';
import AddToCartModal from '@/app/user/search/models/addToCartModal';


export default function BookTable() {
  const [gridApi, setGridApi] = useState(null);
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  
  const books = useSelector(selectBooks);
  const cartBooks = useSelector(selectCartBooks);
  const cartBookIds = new Set(cartBooks.map(book => book.book_id));
  
  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const handleAddInCart = (book) => {
    setSelectedBook(book);
    setShowAddToCartModal(true);
  };

  const handleRemoveFromCart = (book_id) => {
    dispatch(deleteBookFromCart({book_id}));
  }

  const columnDefs = [
    { headerName: "Title", field: "title", sortable: true, filter: true, minWidth: 200 },
    { headerName: "Author", field: "author", sortable: true, filter: true },
    { headerName: "Description", field: "description", sortable: true, filter: true },
    { headerName: "Genre", field: "genre", sortable: true, filter: true },
    { headerName: "Publish Date", field: "publish_date", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div>
          {cartBookIds.has(params.data.book_id) ? 
          (<button
            type="button"
            className="bg-red-100 rounded px-3 py-1 text-xs font-medium text-center hover:bg-red-300"
            onClick={() => handleRemoveFromCart(params.data.book_id)}
        ><FaMinus className="text-red-600" />
        </button>)
          :
          (
            <button
                type="button"
                className="bg-gray-200 rounded px-3 py-1 text-xs font-medium text-center hover:bg-gray-300"
                onClick={() => handleAddInCart(params.data)}
            ><FaCartPlus />
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gridApi]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  console.log("cartBooks", cartBooks)
  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="ag-theme-alpine w-full">
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          domLayout="autoHeight"
        />
      </div>
      <AddToCartModal
        show={showAddToCartModal}
        onClose={() => {setShowAddToCartModal(false); setSelectedBook(null)}}
        book={selectedBook}
      />
    </div>
  );
}
