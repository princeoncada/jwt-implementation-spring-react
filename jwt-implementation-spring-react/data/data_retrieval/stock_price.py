def get_price(ticker, driver):
    url = f'https://finance.yahoo.com/quote/{ticker}'
    driver.get(url)
    xpath = f'//fin-streamer[@data-field="regularMarketPrice" and @data-symbol="{ticker}"]'
    return driver.find_element("xpath", xpath).text
