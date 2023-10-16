import asyncio
from selenium import webdriver


async def load_url(driver, url):
    await driver.get(url)


async def main():
    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=chrome_options)

    # Create a list of URLs to load
    urls = [
        "https://finance.yahoo.com/quote/PEP/financials?p=PEP",
        "https://finance.yahoo.com/quote/PEP/balance-sheet?p=PEP",
        "https://finance.yahoo.com/quote/PEP/cash-flow?p=PEP"
    ]

    # Open and load each URL in a new tab asynchronously
    tasks = []
    for url in urls:
        driver.execute_script("window.open('', '_blank');")
        driver.switch_to.window(driver.window_handles[-1])
        task = asyncio.create_task(load_url(driver, url))
        tasks.append(task)

    # Wait for all tasks to complete
    await asyncio.gather(*tasks)

    # Close the driver
    driver.quit()

if __name__ == "__main__":
    asyncio.run(main())
