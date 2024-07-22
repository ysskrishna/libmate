from fastapi import FastAPI
from src.core.logging_config import setup_logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse


app = FastAPI()
origins = ["*"]

setup_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 


@app.get("/", response_class=HTMLResponse)
async def serve_index():
    return """
    <html>
    <head>
        <title>Library Management System</title>
    </head>
    <body>
        <h1>Library Management System</h1>
    </body>
    </html>
    """

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8081)