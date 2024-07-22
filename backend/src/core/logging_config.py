from logging.config import dictConfig

def setup_logging():
    dictConfig({
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'default': {
                'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            },
        },
        'handlers': {
            'file': {
                'level': 'INFO',
                'class': 'logging.FileHandler',
                'filename': 'app.log',
                'formatter': 'default',
            },
            'console': {
                'level': 'INFO',
                'class': 'logging.StreamHandler',
                'formatter': 'default',
            },
        },
        'root': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
        },
    })
