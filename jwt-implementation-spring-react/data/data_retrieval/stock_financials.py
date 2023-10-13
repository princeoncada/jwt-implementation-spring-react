from selenium.common import NoSuchElementException


def get_financials(num, show_list, header_list, ticker, driver):
    url = f"https://finance.yahoo.com/quote/{ticker}/{show_list[num]}?p={ticker}"
    driver.get(url)

    inner_dictionary = {}
    for header in header_list:
        if header[0] == ">":
            header = header[2:]
            try:
                btn = driver.find_element("xpath", f'//button[@aria-label="{header}"]')
                print("clicked button for " + header)
                btn.click()
            except NoSuchElementException:
                print(f"No button for {header}!")
        try:
            span = driver.find_element("xpath", f'//span[contains(text(), "{header}")]')
            grand_parent_div = span.find_element("xpath", "../..")
            if header == "Breakdown":
                grand_parent_div = span.find_element("xpath", "..")
            siblings = grand_parent_div.find_elements("xpath", "./following-sibling::div")
            inner_dictionary[header] = [sibling.text for sibling in siblings]
        except NoSuchElementException:
            print(f"No {header} element!")
    return inner_dictionary
