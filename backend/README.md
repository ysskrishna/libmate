# Library Management System Backend

This is the backend service for the Library Management System, built with FastAPI and SQLAlchemy.

## Techstack used
- FastAPI
- Postgres
- Alembic
- SQLAlchemy
- Docker

## Prerequisites

- Python 3.8+
- pip
- virtualenv

## Initial Setup

1. Create a virtual environment:
   ```
   virtualenv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```
     .\venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Development

### Running the Development Server

Start the FastAPI server:
```
python main.py
```

The server will be available at `http://localhost:8081/`

### API Documentation

Access the Swagger UI documentation at `http://localhost:8081/docs`

### Updating Dependencies

After adding or removing packages, update the requirements file:
```
pip freeze > requirements.txt
```

## Database Management

We use Alembic for database migrations.

### Models Version History

Import your models in `alembic/env.py` for them to be tracked and to generate version history.

### Alembic Commands

Create an automatic migration:
```
alembic revision --autogenerate -m "description of changes"
```

Create a manual migration:
```
alembic revision -m "description of manual changes"
```

Apply migrations:
```
alembic upgrade head
```