import os
import logging

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

ENVIRONMENT = os.getenv('ENVIRONMENT','local')

if ENVIRONMENT == 'development':
    logger.info('Loading development environment from .env.development')
    load_dotenv('.env.development')
else:
    logger.info('Loading local environment from .env.local')
    load_dotenv('.env.local')

class Config(object):
    DATABASE_URL = os.getenv('DATABASE_URL')
    ALEMBIC_DATABASE_URL = os.getenv('ALEMBIC_DATABASE_URL')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
    JWT_EXPIRE_MINUTES = int(os.getenv('JWT_EXPIRE_MINUTES'))