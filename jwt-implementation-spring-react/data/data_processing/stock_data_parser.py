import pandas as pd
import json
from data_retrieval import stock_scraper
from data_processing import stock_formulas as formula


def parse_stock_data(ticker_symbol):
    stock_data = stock_scraper.get_stock_data(ticker_symbol)

    # Convert the data into Pandas DataFrames
    income_statement_df = pd.DataFrame(stock_data["income_statement"])
    balance_sheet_df = pd.DataFrame(stock_data["balance_sheet"])
    cash_flow_df = pd.DataFrame(stock_data["cash_flow"])
    statistics_dict = stock_data["statistics"]

    # Convert numeric columns to float (excluding "Breakdown" columns)
    cols_to_convert = income_statement_df.columns.difference(["breakdown"])
    income_statement_df[cols_to_convert] = income_statement_df[cols_to_convert].map(formula.convert_to_float)

    cols_to_convert = balance_sheet_df.columns.difference(["breakdown"])
    balance_sheet_df[cols_to_convert] = balance_sheet_df[cols_to_convert].map(formula.convert_to_float)

    cols_to_convert = cash_flow_df.columns.difference(["breakdown"])
    cash_flow_df[cols_to_convert] = cash_flow_df[cols_to_convert].map(formula.convert_to_float)

    # Calculate Ratios
    statistics_dict = formula.calculate_ratios(income_statement_df, cash_flow_df, statistics_dict)

    # Convert percentages to decimals
    for key in statistics_dict:
        statistics_dict[key] = formula.convert_percentage_to_decimal(statistics_dict[key])

    # Convert all other values to floats
    for key in statistics_dict:
        statistics_dict[key] = formula.convert_to_float(statistics_dict[key])

    score_data = formula.stock_score(statistics_dict)

    statistics_dict["Quarterly Revenue Growth"] = (statistics_dict["Quarterly Revenue Growth"] / 4) / 0.05
    statistics_dict["Quarterly Earnings Growth"] = (statistics_dict["Quarterly Earnings Growth"] / 4) / 0.05

    # Create a dictionary with lists instead of DataFrames
    combined_data = {
        "details": stock_data["Details"],
        "score": score_data,
        "financials": {
            "income_statement": income_statement_df.to_dict(orient='list'),
            "balance_sheet": balance_sheet_df.to_dict(orient='list'),
            "cash_flow": cash_flow_df.to_dict(orient='list'),
        },
        "statistics": statistics_dict
    }

    return combined_data


if __name__ == "__main__":
    ticker = "AMZN"
    print(json.dumps(parse_stock_data(ticker), indent=4))
