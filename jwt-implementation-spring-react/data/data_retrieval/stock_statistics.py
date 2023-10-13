def get_statistic(num, show_list, header_list, ticker, driver):
    url = f"https://finance.yahoo.com/quote/{ticker}/{show_list[num]}?p={ticker}"
    driver.get(url)
    inner_dictionary = {}
    for header in header_list:
        xpath = f'//td/span[contains(text(), "{header}")]/../following-sibling::td'
        data = driver.find_element("xpath", xpath)
        inner_dictionary[header] = data.text
    return inner_dictionary

