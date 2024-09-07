"use client";

import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks } from '@/redux/features/booksSlice';
import { getAllBooks, deleteBook } from '@/redux/api/booksApi';
import UpdateBookModal from '@/app/admin/dashboard/modals/updateBookModal';

export default function BookTable() {
  const [gridApi, setGridApi] = useState(null);
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const books = useSelector(selectBooks);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowUpdateModal(true);
  }

  const handleDelete = (book) => {
    dispatch(deleteBook(book.book_id));
  }

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

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
            <button
                type="button"
                className="bg-gray-200 rounded px-2 py-2 text-xs font-medium text-center hover:bg-gray-300 mr-2"
                onClick={() => handleEdit(params.data)}
            ><FaEdit />
            </button>
            <button
                type="button"
                className="bg-red-100 rounded px-2 py-2 text-xs font-medium text-center hover:bg-red-200"
                onClick={() => handleDelete(params.data)}
            ><FaTrash className='text-red-600' />
            </button>
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

  return (
    <>
    <div className="flex flex-col md:flex-row justify-center">
      <div className="ag-theme-alpine w-full">
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onGridReady={onGridReady}
          domLayout="autoHeight"
        />
      </div>
    </div>
    <UpdateBookModal 
      show={showUpdateModal} 
      onClose={() => setShowUpdateModal(false)} 
      book={selectedBook}
    />
    </>
  );
}
