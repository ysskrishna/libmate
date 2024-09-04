export const Role = {
    ADMIN: 'admin',
    USER: 'user'
}

export const BookGenre = {
    FICTION: "Fiction",
    NON_FICTION: "Non-Fiction",
    MYSTERY: "Mystery",
    FANTASY: "Fantasy",
    SCIENCE_FICTION: "Science Fiction",
    BIOGRAPHY: "Biography",
    HISTORY: "History",
    ROMANCE: "Romance",
    THRILLER: "Thriller"
}

export const BookFilterStatus = {
    ALL: { // Represents all books, without any specific filtering.
        value: 'all',
        label: 'All Books'
    },
    BORROWED: { // Represents books that are currently borrowed by the user.
        value: 'borrowed',
        label: 'Borrowed Books'
    },
    RETURNED: { // Represents books that have been returned by the user.
        value: 'returned',
        label: 'Returned Books'
    }
};