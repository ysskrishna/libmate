"""insert entries

Revision ID: 0c97413c7e5f
Revises: a67aa9b109a5
Create Date: 2024-08-24 17:22:16.314500

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0c97413c7e5f'
down_revision: Union[str, None] = 'a67aa9b109a5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
        INSERT INTO admins (name, email, password)
        VALUES ('Admin', 'admin@gmail.com', '$2b$12$kJP5s7Ua65GYQCTfkX7szeDrF.tVkEFnii0VXtnYNgTLisfS/sBg2');
        """
    )

    op.execute(
        """
        INSERT INTO users (name, email, password)
        VALUES ('John', 'john@gmail.com', '$2b$12$GKbx5.9wLTrU6GxzjNmgmecD9QyERcXK1xJMoroX1zjr48t36mTmi');
        """
    )

    op.execute(
        """
        INSERT INTO books (title, description, author, genre, publish_date, total_copies, available_copies)
        VALUES 
        ('To Kill a Mockingbird', 'A novel about the serious issues of rape and racial inequality.', 'Harper Lee', 'Fiction', '1960-07-11', 100, 95),
        ('1984', 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.', 'George Orwell', 'Science Fiction', '1949-06-08', 150, 140),
        ('Moby-Dick', 'A sailor''s narrative of the obsessive quest of Ahab for revenge on Moby Dick.', 'Herman Melville', 'Fiction', '1851-10-18', 120, 115),
        ('Pride and Prejudice', 'A romantic novel of manners.', 'Jane Austen', 'Romance', '1813-01-28', 200, 180),
        ('The Great Gatsby', 'A novel about the American dream and the roaring twenties.', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', 130, 125),
        ('War and Peace', 'A novel that chronicles the history of the French invasion of Russia.', 'Leo Tolstoy', 'History', '1869-01-01', 110, 100),
        ('The Catcher in the Rye', 'A novel about teenage angst and alienation.', 'J.D. Salinger', 'Fiction', '1951-07-16', 140, 130),
        ('The Hobbit', 'A fantasy novel and children''s book by J.R.R. Tolkien.', 'J.R.R. Tolkien', 'Fantasy', '1937-09-21', 160, 150),
        ('The Lord of the Rings', 'An epic high-fantasy novel written by J.R.R. Tolkien.', 'J.R.R. Tolkien', 'Fantasy', '1954-07-29', 170, 160),
        ('The Chronicles of Narnia', 'A series of seven fantasy novels by C.S. Lewis.', 'C.S. Lewis', 'Fantasy', '1950-10-16', 190, 180),
        ('The Alchemist', 'A novel by Paulo Coelho about a young Andalusian shepherd on a journey to the pyramids of Egypt.', 'Paulo Coelho', 'Fiction', '1988-04-01', 200, 190),
        ('Jane Eyre', 'A novel about the experiences of the eponymous heroine.', 'Charlotte Brontë', 'Romance', '1847-10-16', 140, 130),
        ('Wuthering Heights', 'A novel about the intense and almost demonic love between Catherine Earnshaw and Heathcliff.', 'Emily Brontë', 'Romance', '1847-12-17', 120, 110),
        ('Crime and Punishment', 'A novel about the mental anguish and moral dilemmas of an impoverished ex-student.', 'Fyodor Dostoevsky', 'Mystery', '1866-01-01', 130, 120),
        ('The Brothers Karamazov', 'A philosophical novel that enters deeply into the ethical debates about God, free will, and morality.', 'Fyodor Dostoevsky', 'Mystery', '1880-01-01', 110, 100),
        ('Frankenstein', 'A novel that tells the story of Victor Frankenstein, a young scientist who creates a sapient creature.', 'Mary Shelley', 'Science Fiction', '1818-01-01', 160, 150),
        ('The Odyssey', 'An ancient Greek epic poem attributed to Homer.', 'Homer', 'History', null, 140, 130),
        ('The Iliad', 'An ancient Greek epic poem attributed to Homer.', 'Homer', 'History', null, 140, 130),
        ('Anna Karenina', 'A novel about the tragic story of a married aristocrat and her affair.', 'Leo Tolstoy', 'Romance', '1877-01-01', 130, 120),
        ('Brave New World', 'A dystopian social science fiction novel by Aldous Huxley.', 'Aldous Huxley', 'Science Fiction', '1932-01-01', 150, 140),
        ('The Divine Comedy', 'An epic poem by Dante Alighieri.', 'Dante Alighieri', 'History', '1320-01-01', 110, 100),
        ('Les Misérables', 'A novel that is primarily concerned with the lives and interactions of several characters.', 'Victor Hugo', 'History', '1862-01-01', 120, 110),
        ('Don Quixote', 'A Spanish novel by Miguel de Cervantes.', 'Miguel de Cervantes', 'Fiction', '1605-01-01', 160, 150),
        ('One Hundred Years of Solitude', 'A multi-generational story that reflects on the history of Latin America.', 'Gabriel García Márquez', 'Fiction', '1967-05-30', 150, 140),
        ('The Picture of Dorian Gray', 'A philosophical novel by Oscar Wilde.', 'Oscar Wilde', 'Fiction', '1890-01-01', 110, 100),
        ('The Count of Monte Cristo', 'A novel about a man who is wrongfully imprisoned and seeks revenge.', 'Alexandre Dumas', 'Fiction', '1844-01-01', 120, 110),
        ('The Kite Runner', 'A novel by Khaled Hosseini that tells the story of a young boy from Kabul.', 'Khaled Hosseini', 'Fiction', '2003-05-29', 180, 170),
        ('Gone with the Wind', 'A novel by Margaret Mitchell that tells the story of the American South during the Civil War.', 'Margaret Mitchell', 'Fiction', '1936-06-30', 130, 120),
        ('A Tale of Two Cities', 'A novel by Charles Dickens set in London and Paris before and during the French Revolution.', 'Charles Dickens', 'History', '1859-01-01', 140, 130),
        ('Dracula', 'A novel by Bram Stoker about the vampire Count Dracula.', 'Bram Stoker', 'Mystery', '1897-05-26', 120, 110);
        """
    )



def downgrade() -> None:
    op.execute(
        """
        DELETE FROM books;
        """
    )

    op.execute(
        """
        DELETE FROM users WHERE email = 'john@gmail.com';
        """
    )

    op.execute(
        """
        DELETE FROM admins WHERE email = 'admin@gmail.com';
        """
    )

