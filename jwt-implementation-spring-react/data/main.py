from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_retrieval.stock_scraper import scrape
from data_processing.stock_parser import parser
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
async def fetch_stock_data(ticker: str):
    result_data = {}
    try:
        stock_data = scrape(ticker)
        result_data = parser(stock_data, ticker)
    except Exception as e:
        result_data = {"error": e}
    finally:
        return result_data


if __name__ == '__main__':
    uvicorn.run(app, port=2000, host='localhost')
