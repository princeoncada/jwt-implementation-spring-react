import re


def calculate_ratios(income_statement_df, cash_flow_df, statistics_dict):
    ebit = income_statement_df.at[0, "ebit"]
    interest_expense = income_statement_df.at[0, "interest_expense"]
    statistics_dict["interest_coverage_ratio"] = ebit / interest_expense

    ocf = cash_flow_df.at[0, "operating_cash_flow"]
    net_income = income_statement_df.at[0, "net_income"]
    statistics_dict["operating_cash_flow_net_income_ratio"] = ocf / net_income

    fcf = cash_flow_df.at[0, "free_cash_flow"]
    ebitda = income_statement_df.at[0, "ebitda"]
    statistics_dict["free_cash_flow_conversion"] = fcf / ebitda

    oi = income_statement_df.at[0, "operating_income"]
    statistics_dict["debt_coverage_ratio"] = oi / interest_expense

    return statistics_dict


def modify_statistics_keys(statistics_dict):
    modified_statistics_dict = {}
    for key, value in statistics_dict.items():
        if key == "Trailing P/E":
            modified_statistics_dict["trailing_pe"] = value
        else:
            # Modify other keys as needed (e.g., replace '/' with underscores and remove special characters)
            modified_key = key.replace('/', ' ').replace(' ', '_')
            modified_key = re.sub(r'[^\w\s]', '', modified_key).lower()
            modified_statistics_dict[modified_key] = value
    return modified_statistics_dict


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
