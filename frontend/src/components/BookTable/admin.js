"use client";

import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks } from '@/redux/features/booksSlice';
import { getAllBooks } from '@/redux/api/booksApi';

export default function BookTable() {
  const [gridApi, setGridApi] = useState(null);
  const dispatch = useDispatch();

  const books = useSelector(selectBooks);

  const handleEdit = (book) => {
    console.log("handleEdit", book);
  }

  const handleDelete = (book) => {
    console.log("handleDelete", book);
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
                className="bg-gray-200 rounded px-2 py-2 text-xs font-medium text-center hover:bg-gray-300"
                onClick={() => handleDelete(params.data)}
            ><FaTrash />
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
    </div>
  );
}
