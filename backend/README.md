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

### Models version history
Import models in env.py for them to be tracked and generate version history


### Alembic commands
```
alembic revision --autogenerate -m "first migration"
```

### Alembic upgrade
```
alembic upgrade head
```