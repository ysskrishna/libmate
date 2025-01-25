import os
import logging

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

ENVIRONMENT = os.getenv('ENVIRONMENT','local')

if ENVIRONMENT == 'production':
    logger.info('Loading production environment from .env.production')
    load_dotenv('.env.production')
else:
    logger.info('Loading local environment from .env.local')
    load_dotenv('.env.local')

class Config(object):
    ENVIRONMENT = ENVIRONMENT
    DATABASE_URL = os.getenv('DATABASE_URL')
    ALEMBIC_DATABASE_URL = os.getenv('ALEMBIC_DATABASE_URL')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
    JWT_EXPIRE_MINUTES = int(os.getenv('JWT_EXPIRE_MINUTES'))
    SQLALCHEMY_ECHO = os.getenv('SQLALCHEMY_ECHO', '').lower() == 'true'