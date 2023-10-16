from selenium.webdriver import ActionChains


def get_details(ticker_symbol, driver):
    inner_dictionary = {}

    url = f'https://finance.yahoo.com/quote/{ticker_symbol}/profile'
    driver.get(url)

    xpath_price = f'//fin-streamer[@data-field="regularMarketPrice" and @data-symbol="{ticker_symbol}"]'
    xpath_name = f'//div[@data-test="asset-profile"]/div/h3'
    xpath_company_address = f'//div[@data-test="asset-profile"]/div/h3/following-sibling::div/p[1]'
    xpath_company_sector = f'//div[@data-test="asset-profile"]/div/h3/following-sibling::div/p[2]'
    xpath_company_description = f'//span[contains(text(), "Description")]/../following-sibling::p'

    xpath_list = {
        "Price": xpath_price,
        "Name": xpath_name,
        "Address": xpath_company_address,
        "Sector": xpath_company_sector,
        "Description": xpath_company_description
    }

    ActionChains(driver).scroll_by_amount(0, 10000).perform()

    for key, value in xpath_list.items():
        try:
            if key == "Address":
                address_data = driver.find_element("xpath", value).text.split("\n")
                index_two = address_data[1].split(" ")
                inner_dictionary["Address"] = {
                    "Street": address_data[0],
                    "City": index_two[0][:-1],
                    "State": index_two[1],
                    "Zip": index_two[2],
                    "Country": address_data[2],
                    "Phone": address_data[3],
                    "Website": address_data[4]
                }
            elif key == "Sector":
                sector_data = driver.find_element("xpath", value).text.split("\n")
                for data in sector_data:
                    split_data = data.split(": ")
                    inner_dictionary[split_data[0]] = split_data[1]
            else:
                inner_dictionary[key] = driver.find_element("xpath", value).text
            inner_dictionary["Ticker"] = ticker_symbol
        except Exception as e:
            print(f"{key} caused and error! Error: {e}")

    return inner_dictionary
