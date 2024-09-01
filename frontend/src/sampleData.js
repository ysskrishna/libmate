import React from 'react';

const AllBooks = [
    {
      transaction_id: 2,
      book_id: 2,
      user_id: 1,
      collected_date: "2024-07-24",
      due_date: "2024-10-24",
      return_date: null,
      status: "CHECKOUT",
      book: {
        title: "1984",
        author: "George Orwell",
        description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
        genre: "Science Fiction",
        publish_date: "1949-06-08",
        total_copies: 150,
        available_copies: 139
      }
    },
    {
      transaction_id: 1,
      book_id: 1,
      user_id: 1,
      collected_date: "2024-06-24",
      due_date: "2024-09-24",
      return_date: "2024-09-20",
      status: "RETURN",
      book: {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A novel about the serious issues of rape and racial inequality.",
        genre: "Fiction",
        publish_date: "1960-07-11",
        total_copies: 100,
        available_copies: 95
      }
    }
  ];


  const Active = [
    {
        "transaction_id": 2,
        "book_id": 2,
        "user_id": 1,
        "collected_date": "2024-07-24",
        "due_date": "2024-10-24",
        "return_date": null,
        "status": "CHECKOUT",
        "book": {
            "title": "1984",
            "author": "George Orwell",
            "description": "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
            "genre": "Science Fiction",
            "publish_date": "1949-06-08",
            "total_copies": 150,
            "available_copies": 139
        }
    }
];

const Pending = [
    {
        "transaction_id": 1,
        "book_id": 1,
        "user_id": 1,
        "collected_date": "2024-06-24",
        "due_date": "2024-09-24",
        "return_date": "2024-09-20",
        "status": "RETURN",
        "book": {
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "description": "A novel about the serious issues of rape and racial inequality.",
            "genre": "Fiction",
            "publish_date": "1960-07-11",
            "total_copies": 100,
            "available_copies": 95
        }
    }
];

export default {AllBooks, Active, Pending} 