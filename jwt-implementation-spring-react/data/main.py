from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_processing import stock_data_parser
import uvicorn

from selenium import webdriver
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

app = FastAPI()

origins = [
    "http://localhost:5000",
    "http://localhost:8000",
    "http://localhost:2000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/stock/{ticker}")
async def get_stock_data(ticker: str):
    data = {}
    try:
        data = stock_data_parser.parse_stock_data(ticker)
    except Exception as e:
        data = {"error": "Ticker not found"}
    finally:
        return data

if __name__ == '__main__':
    uvicorn.run(app, port=2000, host='localhost')
