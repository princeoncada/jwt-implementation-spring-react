financials_obj = {
    "income_statement": [
        "Breakdown", "> Total Revenue", "Operating Revenue",
        "Cost of Revenue", "> Operating Expense", "Other Operating Expenses",
        "Research & Development", "Operating Income",
        "> Net Income Common Stockholders", "Net Income", "Total Expenses",
        "Interest Income", "Interest Expense", "Net Interest Income",
        "EBIT", "EBITDA"
    ],
    "balance_sheet": [
        "Breakdown", "> Total Assets", "> Current Assets",
        "> Cash, Cash Equivalents & Short Term Investments",
        "Cash And Cash Equivalents", "Other Short Term Investments",
        "> Receivables", "Accounts receivable", "Other Receivables",
        "> Total Liabilities Net Minority Interest", "> Current Liabilities",
        "> Payables And Accrued Expenses", "> Payables", "Accounts Payable",
        "Dividends Payable", "Other Payable",
        "> Total Equity Gross Minority Interest", "> Stockholders' Equity",
        "Total Capitalization",
    ],
    "cash_flow": [
        "Breakdown", "> Operating Cash Flow", "> Investing Cash Flow",
        "> Financing Cash Flow", "Free Cash Flow"
    ]
}

statistics_obj = {
    "statistics": [
        "Trailing P/E", "Price/Sales", "Price/Book", "Enterprise Value/EBITDA",
        "Return on Equity", "Quarterly Revenue Growth", "Quarterly Earnings Growth",
        "Total Debt/Equity", "Forward Annual Dividend Yield", "Trailing Annual Dividend Yield",
        "Payout Ratio"
    ]
}

show_int = {
    "income_statement": 0,
    "balance_sheet": 1,
    "cash_flow": 2,
    "statistics": 3
}

show = [
    "financials",
    "balance-sheet",
    "cash-flow",
    "key-statistics"
]
