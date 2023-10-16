import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver import Chrome, ChromeOptions


def scrape(url, key, headers):
    options = ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")

    with Chrome(options=options) as driver:
        driver.get(url)
        try:
            inner_dictionary = {}
            for header in headers:
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
        except TimeoutException:
            return None


def main(ticker):
    urls = {
        "income_statement": {
            "url": f"https://finance.yahoo.com/quote/{ticker}/financials?p={ticker}",
            "headers": [
                "Breakdown", "> Total Revenue", "Operating Revenue",
                "Cost of Revenue", "> Operating Expense", "Other Operating Expenses",
                "Research & Development", "Operating Income",
                "> Net Income Common Stockholders", "Net Income", "Total Expenses",
                "Interest Income", "Interest Expense", "Net Interest Income",
                "EBIT", "EBITDA"
            ]
        },
        "balance_sheet": {
            "url": f"https://finance.yahoo.com/quote/{ticker}/balance-sheet?p={ticker}",
            "headers": [
                "Breakdown", "> Total Assets", "> Current Assets",
                "> Cash, Cash Equivalents & Short Term Investments",
                "Cash And Cash Equivalents", "Other Short Term Investments",
                "> Receivables", "Accounts receivable", "Other Receivables",
                "> Total Liabilities Net Minority Interest", "> Current Liabilities",
                "> Payables And Accrued Expenses", "> Payables", "Accounts Payable",
                "Dividends Payable", "Other Payable",
                "> Total Equity Gross Minority Interest", "> Stockholders' Equity",
                "Total Capitalization",
            ]
        },
        "cash_flow": {
            "url": f"https://finance.yahoo.com/quote/{ticker}/cash-flow?p={ticker}",
            "headers": [
                "Breakdown", "> Operating Cash Flow", "> Investing Cash Flow",
                "> Financing Cash Flow", "Free Cash Flow"
            ]
        }
    }

    result_dict = {
        "income_statement": {},
        "balance_sheet": {},
        "cash_flow": {}
    }
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(scrape, value["url"], key, value["headers"]) for key, value in urls.items()]
        for future in as_completed(futures):
            if future.result():
                if "Total Revenue" in future.result():
                    result_dict["income_statement"] = future.result()
                elif "Total Assets" in future.result():
                    result_dict["balance_sheet"] = future.result()
                else:
                    result_dict["cash_flow"] = future.result()
    return result_dict


if __name__ == "__main__":
    print(json.dumps(main("AAPL"), indent=4))
