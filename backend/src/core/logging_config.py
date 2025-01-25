import os
from logging.config import dictConfig

log_dir = 'logs'
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

log_file = os.path.join(log_dir, 'app.log')

def setup_logging():
    dictConfig({
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'default': {
                'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            }
        },
        'handlers': {
            'file': {
                'level': 'DEBUG',
                'class': 'logging.FileHandler',
                'filename': log_file,
                'formatter': 'default',
            },
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'default',
            }
        },
        'loggers': {
            "": {  # Root logger
                "handlers": ["file", "console"],
                "level": "DEBUG",
            },
            "uvicorn": {
                "handlers": ["file", "console"],
                "level": "INFO",
                "propagate": False
            },
            "uvicorn.access": {
                "handlers": ["file", "console"],
                "level": "INFO",
                "propagate": False
            },
            "uvicorn.error": {
                "handlers": ["file", "console"],
                "level": "ERROR",  # Only capture actual errors
                "propagate": False
            }
        },
        'root': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
        },
    })
