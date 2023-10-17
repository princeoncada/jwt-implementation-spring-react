def calculate_ratios(income_statement_df, cash_flow_df, statistics_dict):
    ebit = income_statement_df.at[0, "EBIT"]
    interest_expense = income_statement_df.at[0, "Interest Expense"]
    statistics_dict["Interest Coverage Ratio"] = ebit / interest_expense

    ocf = cash_flow_df.at[0, "Operating Cash Flow"]
    net_income = income_statement_df.at[0, "Net Income"]
    statistics_dict["Operating Cash Flow / Net Income Ratio"] = ocf / net_income

    fcf = cash_flow_df.at[0, "Free Cash Flow"]
    ebitda = income_statement_df.at[0, "EBITDA"]
    statistics_dict["Free Cash Flow Conversion"] = fcf / ebitda

    oi = income_statement_df.at[0, "Operating Income"]
    statistics_dict["Debt Coverage Ratio"] = oi / interest_expense

    return statistics_dict


def convert_to_float(value):
    if isinstance(value, str):
        value = value.replace(',', '')
        if value == '-' or value == 'N/A':
            return 0.0  # Convert "-" to a negative zero float
        if (value.replace('.', '', 1).isdigit()
                or (value.startswith('-') and value[1:].replace('.', '', 1).isdigit())):
            return float(value)
    return value  # Convert all other cases, including "N/A" and non-numeric values, to 0.0


def convert_percentage_to_decimal(percentage_str):
    if isinstance(percentage_str, str) and percentage_str.endswith('%'):
        return float(percentage_str.strip('%')) / 100
    return percentage_str


def stock_score(statistics_dict):
    inner_dictionary = {
        "growth": 0,
        "value": 0,
        "dividend": 0
    }

    # Growth
    if statistics_dict["Quarterly Revenue Growth"] > 1:
        inner_dictionary["growth"] += 1
    if statistics_dict["Quarterly Earnings Growth"] > 1:
        inner_dictionary["growth"] += 1
    if statistics_dict["Trailing P/E"] <= 9:
        inner_dictionary["growth"] += 1
    if statistics_dict["Interest Coverage Ratio"] > 1.5:
        inner_dictionary["growth"] += 1
    if statistics_dict["Operating Cash Flow / Net Income Ratio"] > 1:
        inner_dictionary["growth"] += 1

    # Value
    if statistics_dict["Price/Book"] < 1.20:
        inner_dictionary["value"] += 1
    if statistics_dict["Price/Sales"] < 2:
        inner_dictionary["value"] += 1
    if statistics_dict["Enterprise Value/EBITDA"] < 9:
        inner_dictionary["value"] += 1
    if statistics_dict["Free Cash Flow Conversion"] >= 1:
        inner_dictionary["value"] += 1
    if statistics_dict["Total Debt/Equity"] < 2.5:
        inner_dictionary["value"] += 1

    # Dividend
    if statistics_dict["Trailing Annual Dividend Yield"] > 0.05:
        inner_dictionary["dividend"] += 1
    if statistics_dict["Forward Annual Dividend Yield"] > 0.05:
        inner_dictionary["dividend"] += 1
    if 0.6 >= statistics_dict["Payout Ratio"] >= 0.3:
        inner_dictionary["dividend"] += 1
    if statistics_dict["Debt Coverage Ratio"] > 2:
        inner_dictionary["dividend"] += 1
    if statistics_dict["Return on Equity"] > 0.15:
        inner_dictionary["dividend"] += 1

    inner_dictionary["total"] = inner_dictionary["growth"] + inner_dictionary["value"] + inner_dictionary["dividend"]

    return inner_dictionary
