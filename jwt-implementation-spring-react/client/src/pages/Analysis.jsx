import '../styles/Analysis.css'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Table from "../components/Table.jsx";
import React, {useEffect, useState} from "react";
import List from "../components/List.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import AnalysisView from "./AnalysisView.jsx";

function Analysis() {
    const { ticker } = useParams();
    const [loading, setLoading] = useState(true);
    const [stockData, setStockData] = useState({
        "details": {
            "Price": "129.79",
            "Ticker": "AMZN",
            "Name": "Amazon.com, Inc.",
            "Address": {
                "Street": "410 Terry Avenue North",
                "City": "Seattle",
                "State": "WA",
                "Zip": "98109-5210",
                "Country": "United States",
                "Phone": "206 266 1000",
                "Website": "https://www.aboutamazon.com"
            },
            "Sector(s)": "Consumer Cyclical",
            "Industry": "Internet Retail",
            "Full Time Employees": "1,541,000",
            "Description": "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores in North America and internationally. It operates through three segments: North America, International, and Amazon Web Services (AWS). The company's products offered through its stores include merchandise and content purchased for resale; and products offered by third-party sellers. It also manufactures and sells electronic devices, including Kindle, Fire tablets, Fire TVs, Rings, Blink, eero, and Echo; and develops and produces media content. In addition, the company offers programs that enable sellers to sell their products in its stores; and programs that allow authors, musicians, filmmakers, Twitch streamers, skill and app developers, and others to publish and sell content. Further, it provides compute, storage, database, analytics, machine learning, and other services, as well as fulfillment, advertising, and digital content subscriptions. Additionally, the company offers Amazon Prime, a membership program. It serves consumers, sellers, developers, enterprises, content creators, and advertisers. The company was incorporated in 1994 and is headquartered in Seattle, Washington."
        },
        "score": {
            "growth": 2,
            "value": 1,
            "dividend": 1
        },
        "financials": {
            "income_statement": {
                "Breakdown": [
                    "TTM",
                    "12/30/2022",
                    "12/30/2021",
                    "12/30/2020",
                    "12/30/2019"
                ],
                "Total Revenue": [
                    538046000.0,
                    513983000.0,
                    469822000.0,
                    386064000.0,
                    280522000.0
                ],
                "Operating Revenue": [
                    538046000.0,
                    513983000.0,
                    469822000.0,
                    386064000.0,
                    280522000.0
                ],
                "Cost of Revenue": [
                    461648000.0,
                    446343000.0,
                    403507000.0,
                    334564000.0,
                    241699000.0
                ],
                "Operating Expense": [
                    58681000.0,
                    55392000.0,
                    41436000.0,
                    28601000.0,
                    24282000.0
                ],
                "Other Operating Expenses": [
                    1293000.0,
                    1263000.0,
                    62000.0,
                    -75000.0,
                    201000.0
                ],
                "Research & Development": [
                    0.0,
                    0.0,
                    0.0,
                    42740000.0,
                    35931000.0
                ],
                "Operating Income": [
                    17717000.0,
                    12248000.0,
                    24879000.0,
                    22899000.0,
                    14541000.0
                ],
                "Net Income Common Stockholders": [
                    13072000.0,
                    -2722000.0,
                    33364000.0,
                    21331000.0,
                    11588000.0
                ],
                "Net Income": [
                    13072000.0,
                    -2722000.0,
                    33364000.0,
                    21331000.0,
                    11588000.0
                ],
                "Total Expenses": [
                    520329000.0,
                    501735000.0,
                    444943000.0,
                    363165000.0,
                    265981000.0
                ],
                "Interest Income": [
                    -980000.0,
                    -1378000.0,
                    -1361000.0,
                    -1092000.0,
                    -768000.0
                ],
                "Interest Expense": [
                    2974000.0,
                    2367000.0,
                    1809000.0,
                    1647000.0,
                    1600000.0
                ],
                "Net Interest Income": [
                    -980000.0,
                    -1378000.0,
                    -1361000.0,
                    -1092000.0,
                    -768000.0
                ],
                "EBIT": [
                    16638000.0,
                    -3569000.0,
                    39960000.0,
                    25825000.0,
                    15576000.0
                ],
                "EBITDA": [
                    62362000.0,
                    38352000.0,
                    74256000.0,
                    51076000.0,
                    37365000.0
                ]
            },
            "balance_sheet": {
                "Breakdown": [
                    "12/30/2022",
                    "12/30/2021",
                    "12/30/2020",
                    "12/30/2019"
                ],
                "Total Assets": [
                    462675000.0,
                    420549000.0,
                    321195000.0,
                    225248000.0
                ],
                "Current Assets": [
                    146791000.0,
                    161580000.0,
                    132733000.0,
                    96334000.0
                ],
                "Cash, Cash Equivalents & Short Term Investments": [
                    70026000.0,
                    96049000.0,
                    84396000.0,
                    55021000.0
                ],
                "Cash And Cash Equivalents": [
                    53888000.0,
                    36220000.0,
                    42122000.0,
                    36092000.0
                ],
                "Other Short Term Investments": [
                    16138000.0,
                    59829000.0,
                    42274000.0,
                    18929000.0
                ],
                "Receivables": [
                    42360000.0,
                    32891000.0,
                    24542000.0,
                    20816000.0
                ],
                "Accounts receivable": [
                    42360000.0,
                    32891000.0,
                    24542000.0,
                    20816000.0
                ],
                "Total Liabilities Net Minority Interest": [
                    316632000.0,
                    282304000.0,
                    227791000.0,
                    163188000.0
                ],
                "Current Liabilities": [
                    155393000.0,
                    142266000.0,
                    126385000.0,
                    87812000.0
                ],
                "Payables And Accrued Expenses": [
                    142166000.0,
                    130439000.0,
                    116677000.0,
                    79622000.0
                ],
                "Payables": [
                    142166000.0,
                    130439000.0,
                    116677000.0,
                    79622000.0
                ],
                "Accounts Payable": [
                    79600000.0,
                    78664000.0,
                    72539000.0,
                    47183000.0
                ],
                "Total Equity Gross Minority Interest": [
                    146043000.0,
                    138245000.0,
                    93404000.0,
                    62060000.0
                ],
                "Stockholders' Equity": [
                    146043000.0,
                    138245000.0,
                    93404000.0,
                    62060000.0
                ],
                "Total Capitalization": [
                    213193000.0,
                    186989000.0,
                    125220000.0,
                    85474000.0
                ]
            },
            "cash_flow": {
                "Breakdown": [
                    "TTM",
                    "12/30/2022",
                    "12/30/2021",
                    "12/30/2020",
                    "12/30/2019"
                ],
                "Operating Cash Flow": [
                    61841000.0,
                    46752000.0,
                    46327000.0,
                    66064000.0,
                    38514000.0
                ],
                "Investing Cash Flow": [
                    -51908000.0,
                    -37601000.0,
                    -58154000.0,
                    -59611000.0,
                    -24281000.0
                ],
                "Financing Cash Flow": [
                    2917000.0,
                    9718000.0,
                    6291000.0,
                    -1104000.0,
                    -10066000.0
                ],
                "Free Cash Flow": [
                    3209000.0,
                    -16893000.0,
                    -14726000.0,
                    25924000.0,
                    21653000.0
                ]
            }
        },
        "statistics": {
            "Trailing P/E": "103.01",
            "Price/Sales": "2.48",
            "Price/Book": "7.94",
            "Enterprise Value/EBITDA": "22.68",
            "Return on Equity": "8.72%",
            "Quarterly Revenue Growth": "54.00%",
            "Quarterly Earnings Growth": "0.00%",
            "Total Debt/Equity": "103.37%",
            "Forward Annual Dividend Yield": "1.04%",
            "Trailing Annual Dividend Yield": "0.00%",
            "Payout Ratio": "0.00%",
            "Interest Coverage Ratio": "5.59",
            "Operating Cash Flow / Net Income Ratio": "4.73",
            "Free Cash Flow Conversion": "0.05",
            "Debt Coverage Ratio": "5.96"
        }
    });

    useEffect(() => {
        console.log("useEffect Running!")
        axios.get(`http://localhost:8000/api/stock/${ticker}`)
            .then((response) => {
                const jsonObject = JSON.parse(response.data["stockData"]);
                setStockData(jsonObject)
                setLoading(false);
            })
            .catch((error) => {
                console.log("API:", error);
                setLoading(false);
            })
    }, []);

    return (
        <>
            <Header />
            <main>
                { !loading && <AnalysisView stockData={stockData}/>}
            </main>
            <Footer />
        </>
    );
}

export default Analysis;