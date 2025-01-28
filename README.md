# Library Management System

A full stack application for a library book vending application. It is designed to manage book inventories, and member management, ensuring a seamless experience for borrowing and returning books through automated vending machines.


## Media - User Portal

<video width="320" height="240" controls>
  <source src="./media/libmate_user_demo.mp4" type="video/mp4">
</video>


https://github.com/user-attachments/assets/beebd49a-4143-4efb-a8ec-5e95c4675e0a

#### User - Login Page
<img src="./media/user_login.JPG" alt="User Login Page"/>

#### User - Register Page
<img src="./media/register.JPG" alt="User Register Page"/>

#### User - Dashboard Page
<img src="./media/user_dashboard.JPG" alt="User Dashboard Page"/>

#### User - Search Page
<img src="./media/user_search.JPG" alt="User Search Page"/>

#### User - Add Book to Cart Page
<img src="./media/user_add_book_to_cart.JPG" alt="User Add Book to Cart Page"/>

#### User - Cart Page
<img src="./media/user_cart.JPG" alt="User Cart Page"/>


## Media - Admin Portal

<video width="320" height="240" controls>
  <source src="./media/libmate_admin_demo.mp4" type="video/mp4">
</video>


https://github.com/user-attachments/assets/245bd896-74c6-43ae-9126-12d275c7b481

#### Admin - Login Page
<img src="./media/admin_login.JPG" alt="Admin Login Page"/>

#### Admin - Dashboard Page
<img src="./media/admin_dashboard.JPG" alt="Admin Dashboard Page"/>

#### Admin - Add Book Page
<img src="./media/admin_create_book.JPG" alt="Admin Add Book Page"/>

#### Admin - Update Book Page
<img src="./media/admin_update_book.JPG" alt="Admin Update Book Page"/>




## Techstack used
- NextJS
- Redux Toolkit
- Redux Persist
- Tailwindcss
- FastAPI
- Postgres
- Alembic
- SQLAlchemy
- Docker


## Features

- User Authentication
  - Admin and User login functionality
  - Secure credential management

- Book Management
  - Add, edit, and remove books from the library catalog
  - Track book availability and loan status

- User Management
  - Register new library Admins and Users

- Loan Management
  - Check out and return books




## Installation

Prerequisites: Docker

1. Clone the repository
2. Run `docker compose -f docker-compose-production.yml up` to start the all instances
3. Run `docker compose -f docker-compose-production.yml down` to stop the all instances
4. Run `docker compose -f docker-compose-production.yml up --build` to build and start the all instances
5. Frontend will be running on `http://localhost:3000`
6. Backend will be running on `http://localhost:8081`
7. Database will be running on `http://localhost:5432`



## Usage

### Admin Access
- Email: admin@gmail.com
- Password: admin

### User Access
- Email: john@gmail.com
- Password: demo


# License

Copyright (c) 2024 [Y. Siva Sai Krishna](https://github.com/ysskrishna)

This project is licensed under the AGPL-3.0 License - see the LICENSE file for details.
