import { useState, useEffect } from 'react';
import AddToCartForm from '../../components/Cart/AddToCartForm';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function BookTable() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [gridWidth, setGridWidth] = useState('100%');

  const books = [
    {
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "description": "A novel about the serious issues of rape and racial inequality.",
      "genre": "Fiction",
      "publish_date": "1960-07-11",
      "total_copies": 100,
      "available_copies": 95,
      "book_id": 1
  },
  {
      "title": "1984",
      "author": "George Orwell",
      "description": "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
      "genre": "Science Fiction",
      "publish_date": "1949-06-08",
      "total_copies": 150,
      "available_copies": 140,
      "book_id": 2
  },
  {
      "title": "Moby-Dick",
      "author": "Herman Melville",
      "description": "A sailor's narrative of the obsessive quest of Ahab for revenge on Moby Dick.",
      "genre": "Fiction",
      "publish_date": "1851-10-18",
      "total_copies": 120,
      "available_copies": 115,
      "book_id": 3
  },
  {
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "description": "A romantic novel of manners.",
      "genre": "Romance",
      "publish_date": "1813-01-28",
      "total_copies": 200,
      "available_copies": 180,
      "book_id": 4
  },
  {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A novel about the American dream and the roaring twenties.",
      "genre": "Fiction",
      "publish_date": "1925-04-10",
      "total_copies": 130,
      "available_copies": 125,
      "book_id": 5
  },
  {
      "title": "War and Peace",
      "author": "Leo Tolstoy",
      "description": "A novel that chronicles the history of the French invasion of Russia.",
      "genre": "History",
      "publish_date": "1869-01-01",
      "total_copies": 110,
      "available_copies": 100,
      "book_id": 6
  },
  {
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "description": "A novel about teenage angst and alienation.",
      "genre": "Fiction",
      "publish_date": "1951-07-16",
      "total_copies": 140,
      "available_copies": 130,
      "book_id": 7
  },
  {
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "description": "A fantasy novel and children's book by J.R.R. Tolkien.",
      "genre": "Fantasy",
      "publish_date": "1937-09-21",
      "total_copies": 160,
      "available_copies": 150,
      "book_id": 8
  },
  {
      "title": "The Lord of the Rings",
      "author": "J.R.R. Tolkien",
      "description": "An epic high-fantasy novel written by J.R.R. Tolkien.",
      "genre": "Fantasy",
      "publish_date": "1954-07-29",
      "total_copies": 170,
      "available_copies": 160,
      "book_id": 9
  },
  {
      "title": "The Chronicles of Narnia",
      "author": "C.S. Lewis",
      "description": "A series of seven fantasy novels by C.S. Lewis.",
      "genre": "Fantasy",
      "publish_date": "1950-10-16",
      "total_copies": 190,
      "available_copies": 180,
      "book_id": 10
  },
  {
      "title": "The Alchemist",
      "author": "Paulo Coelho",
      "description": "A novel by Paulo Coelho about a young Andalusian shepherd on a journey to the pyramids of Egypt.",
      "genre": "Fiction",
      "publish_date": "1988-04-01",
      "total_copies": 200,
      "available_copies": 190,
      "book_id": 11
  },
  {
      "title": "Jane Eyre",
      "author": "Charlotte Brontë",
      "description": "A novel about the experiences of the eponymous heroine.",
      "genre": "Romance",
      "publish_date": "1847-10-16",
      "total_copies": 140,
      "available_copies": 130,
      "book_id": 12
  },
  {
      "title": "Wuthering Heights",
      "author": "Emily Brontë",
      "description": "A novel about the intense and almost demonic love between Catherine Earnshaw and Heathcliff.",
      "genre": "Romance",
      "publish_date": "1847-12-17",
      "total_copies": 120,
      "available_copies": 110,
      "book_id": 13
  },
  {
      "title": "Crime and Punishment",
      "author": "Fyodor Dostoevsky",
      "description": "A novel about the mental anguish and moral dilemmas of an impoverished ex-student.",
      "genre": "Mystery",
      "publish_date": "1866-01-01",
      "total_copies": 130,
      "available_copies": 120,
      "book_id": 14
  },
  {
      "title": "The Brothers Karamazov",
      "author": "Fyodor Dostoevsky",
      "description": "A philosophical novel that enters deeply into the ethical debates about God, free will, and morality.",
      "genre": "Mystery",
      "publish_date": "1880-01-01",
      "total_copies": 110,
      "available_copies": 100,
      "book_id": 15
  },
  {
      "title": "Frankenstein",
      "author": "Mary Shelley",
      "description": "A novel that tells the story of Victor Frankenstein, a young scientist who creates a sapient creature.",
      "genre": "Science Fiction",
      "publish_date": "1818-01-01",
      "total_copies": 160,
      "available_copies": 150,
      "book_id": 16
  },
  {
      "title": "The Odyssey",
      "author": "Homer",
      "description": "An ancient Greek epic poem attributed to Homer.",
      "genre": "History",
      "publish_date": null,
      "total_copies": 140,
      "available_copies": 130,
      "book_id": 17
  },
  {
      "title": "The Iliad",
      "author": "Homer",
      "description": "An ancient Greek epic poem attributed to Homer.",
      "genre": "History",
      "publish_date": null,
      "total_copies": 140,
      "available_copies": 130,
      "book_id": 18
  },
  {
      "title": "Anna Karenina",
      "author": "Leo Tolstoy",
      "description": "A novel about the tragic story of a married aristocrat and her affair.",
      "genre": "Romance",
      "publish_date": "1877-01-01",
      "total_copies": 130,
      "available_copies": 120,
      "book_id": 19
  },
  {
      "title": "Brave New World",
      "author": "Aldous Huxley",
      "description": "A dystopian social science fiction novel by Aldous Huxley.",
      "genre": "Science Fiction",
      "publish_date": "1932-01-01",
      "total_copies": 150,
      "available_copies": 140,
      "book_id": 20
  },
  {
      "title": "The Divine Comedy",
      "author": "Dante Alighieri",
      "description": "An epic poem by Dante Alighieri.",
      "genre": "History",
      "publish_date": "1320-01-01",
      "total_copies": 110,
      "available_copies": 100,
      "book_id": 21
  },
  {
      "title": "Les Misérables",
      "author": "Victor Hugo",
      "description": "A novel that is primarily concerned with the lives and interactions of several characters.",
      "genre": "History",
      "publish_date": "1862-01-01",
      "total_copies": 120,
      "available_copies": 110,
      "book_id": 22
  },
  {
      "title": "Don Quixote",
      "author": "Miguel de Cervantes",
      "description": "A Spanish novel by Miguel de Cervantes.",
      "genre": "Fiction",
      "publish_date": "1605-01-01",
      "total_copies": 160,
      "available_copies": 150,
      "book_id": 23
  },
  {
      "title": "One Hundred Years of Solitude",
      "author": "Gabriel García Márquez",
      "description": "A multi-generational story that reflects on the history of Latin America.",
      "genre": "Fiction",
      "publish_date": "1967-05-30",
      "total_copies": 150,
      "available_copies": 140,
      "book_id": 24
  },
  {
      "title": "The Picture of Dorian Gray",
      "author": "Oscar Wilde",
      "description": "A philosophical novel by Oscar Wilde.",
      "genre": "Fiction",
      "publish_date": "1890-01-01",
      "total_copies": 110,
      "available_copies": 100,
      "book_id": 25
  },
  {
      "title": "The Count of Monte Cristo",
      "author": "Alexandre Dumas",
      "description": "A novel about a man who is wrongfully imprisoned and seeks revenge.",
      "genre": "Fiction",
      "publish_date": "1844-01-01",
      "total_copies": 120,
      "available_copies": 110,
      "book_id": 26
  },
  {
      "title": "The Kite Runner",
      "author": "Khaled Hosseini",
      "description": "A novel by Khaled Hosseini that tells the story of a young boy from Kabul.",
      "genre": "Fiction",
      "publish_date": "2003-05-29",
      "total_copies": 180,
      "available_copies": 170,
      "book_id": 27
  },
  {
      "title": "Gone with the Wind",
      "author": "Margaret Mitchell",
      "description": "A novel by Margaret Mitchell that tells the story of the American South during the Civil War.",
      "genre": "Fiction",
      "publish_date": "1936-06-30",
      "total_copies": 130,
      "available_copies": 120,
      "book_id": 28
  },
  {
      "title": "A Tale of Two Cities",
      "author": "Charles Dickens",
      "description": "A novel by Charles Dickens set in London and Paris before and during the French Revolution.",
      "genre": "History",
      "publish_date": "1859-01-01",
      "total_copies": 140,
      "available_copies": 130,
      "book_id": 29
  },
  {
      "title": "Dracula",
      "author": "Bram Stoker",
      "description": "A novel by Bram Stoker about the vampire Count Dracula.",
      "genre": "Mystery",
      "publish_date": "1897-05-26",
      "total_copies": 120,
      "available_copies": 110,
      "book_id": 30
  }

  ];

  const columnDefs = [
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Author", field: "author", sortable: true, filter: true },
    { headerName: "Description", field: "description", sortable: true, filter: true },
    { headerName: "Genre", field: "genre", sortable: true, filter: true },
    { headerName: "Publish Date", field: "publish_date", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <button
          className="bg-gray-200 rounded px-4 py-1"
          onClick={() => setSelectedBook(params.data)}
        >
          Add to cart
        </button>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setGridWidth(width < 768 ? '100%' : '80%');
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex justify-center">
    <div className="ag-theme-alpine" style={{ height: 600, width: gridWidth }}>
      <AgGridReact
        rowData={books}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
    {selectedBook && (
      <AddToCartForm book={selectedBook} onClose={() => setSelectedBook(null)} />
    )}
  </div>
  );
}
