# Backend

## initial setup
```
virtualenv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

## How to run development
```
python main.py
```

## update requirements
```
pip freeze > requirements.txt
```

### Access development server
```
http://localhost:8081/
```

### Access swagger documentation
```
http://localhost:8081/docs
```

### Models version history
Import models in alembic/env.py for them to be tracked and generate version history


### Alembic commands
Create automatic migration
```
alembic revision --autogenerate -m "initial migrations"
```

Create manual migration
```
alembic revision -m "insert entries"
```

### Alembic upgrade
```
alembic upgrade head
```