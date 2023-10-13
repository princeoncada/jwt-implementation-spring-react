from selenium import webdriver

from data_retrieval import stock_objects as obj
from data_retrieval import stock_financials as fin
from data_retrieval import stock_statistics as stat
from data_retrieval import stock_price as price


def get_stock_data(ticker):
    dictionary = {}
    driver = None
    try:
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--headless")
        driver = webdriver.Chrome(options=chrome_options)

        for key, value in obj.financials_obj.items():
            dictionary[key] = fin.get_financials(obj.show_int[key], obj.show, value, ticker, driver)

        for key, value in obj.statistics_obj.items():
            dictionary[key] = stat.get_statistic(obj.show_int[key], obj.show, value, ticker, driver)

        dictionary["Price"] = price.get_price(ticker, driver)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        if driver:
            driver.quit()
        return dictionary
