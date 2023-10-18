import '../styles/Screen.css'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import Filter from "../components/Filter.jsx";
import axios from "axios";

function Screen() {
    const [filterDetails, setFilterDetails] = useState(null);

    const [peRatio, setPeRatio] = useState(null);
    const [peRatioChecked, setPeRatioChecked] = useState(true);

    const [priceToSales, setPriceToSales] = useState(null);
    const [priceToSalesChecked, setPriceToSalesChecked] = useState(true);

    const [priceToBook, setPriceToBook] = useState(null);
    const [priceToBookChecked, setPriceToBookChecked] = useState(true);

    const [enterpriseValueToEbitda, setEnterpriseValueToEbitda] = useState(null);
    const [enterpriseValueToEbitdaChecked, setEnterpriseValueToEbitdaChecked] = useState(true);

    const [returnOnEquity, setReturnOnEquity] = useState(null);
    const [returnOnEquityChecked, setReturnOnEquityChecked] = useState(true);

    const [quarterlyRevenueGrowth, setQuarterlyRevenueGrowth] = useState(null);
    const [quarterlyRevenueGrowthChecked, setQuarterlyRevenueGrowthChecked] = useState(true);

    const [quarterlyEarningsGrowth, setQuarterlyEarningsGrowth] = useState(null);
    const [quarterlyEarningsGrowthChecked, setQuarterlyEarningsGrowthChecked] = useState(true);

    const [totalDebtToEquity, setTotalDebtToEquity] = useState(null);
    const [totalDebtToEquityChecked, setTotalDebtToEquityChecked] = useState(true);

    const [forwardAnnualDividendYield, setForwardAnnualDividendYield] = useState(null);
    const [forwardAnnualDividendYieldChecked, setForwardAnnualDividendYieldChecked] = useState(true);

    const [trailingAnnualDividendYield, setTrailingAnnualDividendYield] = useState(null);
    const [trailingAnnualDividendYieldChecked, setTrailingAnnualDividendYieldChecked] = useState(true);

    const [payoutRatio, setPayoutRatio] = useState(null);
    const [payoutRatioChecked, setPayoutRatioChecked] = useState(true);

    const [interestCoverageRatio, setInterestCoverageRatio] = useState(null);
    const [interestCoverageRatioChecked, setInterestCoverageRatioChecked] = useState(true);

    const [operatingCashFlowToNetIncome, setOperatingCashFlowToNetIncome] = useState(null);
    const [operatingCashFlowToNetIncomeChecked, setOperatingCashFlowToNetIncomeChecked] = useState(true);

    const [freeCashFlowConversion, setFreeCashFlowConversion] = useState(null);
    const [freeCashFlowConversionChecked, setFreeCashFlowConversionChecked] = useState(true);

    const [debtCoverageRatio, setDebtCoverageRatio] = useState(null);
    const [debtCoverageRatioChecked, setDebtCoverageRatioChecked] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/api/stock/minmax")
            .then(response => {
                let value = response.data
                setFilterDetails(value)

                setPeRatio(value["trailing_pe"])
                setPriceToSales(value["price_sales"])
                setPriceToBook(value["price_book"])
                setEnterpriseValueToEbitda(value["enterprise_value_ebitda"])
                setReturnOnEquity(value["return_on_equity"])
                setQuarterlyRevenueGrowth(value["quarterly_revenue_growth"])
                setQuarterlyEarningsGrowth(value["quarterly_earnings_growth"])
                setTotalDebtToEquity(value["total_debt_equity"])
                setForwardAnnualDividendYield(value["forward_annual_dividend_yield"])
                setTrailingAnnualDividendYield(value["trailing_annual_dividend_yield"])
                setPayoutRatio(value["payout_ratio"])
                setInterestCoverageRatio(value["interest_coverage_ratio"])
                setOperatingCashFlowToNetIncome(value["operating_cash_flow_net_income_ratio"])
                setFreeCashFlowConversion(value["free_cash_flow_conversion"])
                setDebtCoverageRatio(value["debt_coverage_ratio"])

            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    function handleSubmit() {
        function applyRounding(value) {
            if (value && value.length === 2) {
                // Round down the first element and round up the second element
                return [Math.floor(value[0]), Math.ceil(value[1])];
            }
            return value;
        }
        let filter = {}
        if (peRatioChecked) {
            filter["trailingPe"] = applyRounding(peRatio)
        }
        if (priceToSalesChecked) {
            filter["priceSales"] = applyRounding(priceToSales)
        }
        if (priceToBookChecked) {
            filter["priceBook"] = applyRounding(priceToBook)
        }
        if (enterpriseValueToEbitdaChecked) {
            filter["enterpriseValueEbitda"] = applyRounding(enterpriseValueToEbitda)
        }
        if (returnOnEquityChecked) {
            filter["returnOnEquity"] = applyRounding(returnOnEquity)
        }
        if (quarterlyRevenueGrowthChecked) {
            filter["quarterlyRevenueGrowth"] = applyRounding(quarterlyRevenueGrowth)
        }
        if (quarterlyEarningsGrowthChecked) {
            filter["quarterlyEarningsGrowth"] = applyRounding(quarterlyEarningsGrowth)
        }
        if (totalDebtToEquityChecked) {
            filter["totalDebtEquity"] = applyRounding(totalDebtToEquity)
        }
        if (forwardAnnualDividendYieldChecked) {
            filter["forwardAnnualDividendYield"] = applyRounding(forwardAnnualDividendYield)
        }
        if (trailingAnnualDividendYieldChecked) {
            filter["trailingAnnualDividendYield"] = applyRounding(trailingAnnualDividendYield)
        }
        if (payoutRatioChecked) {
            filter["payoutRatio"] = applyRounding(payoutRatio)
        }
        if (interestCoverageRatioChecked) {
            filter["interestCoverageRatio"] = applyRounding(interestCoverageRatio)
        }
        if (operatingCashFlowToNetIncomeChecked) {
            filter["operatingCashFlowNetIncomeRatio"] = applyRounding(operatingCashFlowToNetIncome)
        }
        if (freeCashFlowConversionChecked) {
            filter["freeCashFlowConversion"] = applyRounding(freeCashFlowConversion)
        }
        if (debtCoverageRatioChecked) {
            filter["debtCoverageRatio"] = applyRounding(debtCoverageRatio)
        }
        console.log(filter)
    }

    return (
        <>
            <Header />
                <main>
                    { filterDetails == null ? <div>Loading...</div> :
                    <div className="stock-screen">
                        <h2>Stock Screening</h2>
                        <div>

                            <Filter
                                element={"P/E Ratio"}
                                value={peRatio}
                                changeValue={(event, newValue) => setPeRatio(newValue)}
                                checked={!peRatioChecked}
                                changeChecked={() => setPeRatioChecked(!peRatioChecked)}
                                step={0.01}
                                min={filterDetails["trailing_pe"][0]}
                                max={filterDetails["trailing_pe"][1]}
                            />

                            <Filter
                                element={"Price/Sales"}
                                value={priceToSales}
                                changeValue={(event, newValue) => setPriceToSales(newValue)}
                                checked={!priceToSalesChecked}
                                changeChecked={() => setPriceToSalesChecked(!priceToSalesChecked)}
                                step={0.01}
                                min={filterDetails["price_sales"][0]}
                                max={filterDetails["price_sales"][1]}
                            />

                            <Filter
                                element={"Price/Book"}
                                value={priceToBook}
                                changeValue={(event, newValue) => setPriceToBook(newValue)}
                                checked={!priceToBookChecked}
                                changeChecked={() => setPriceToBookChecked(!priceToBookChecked)}
                                step={0.01}
                                min={filterDetails["price_book"][0]}
                                max={filterDetails["price_book"][1]}
                            />

                            <Filter
                                element={"Enterprise Value/EBITDA"}
                                value={enterpriseValueToEbitda}
                                changeValue={(event, newValue) => setEnterpriseValueToEbitda(newValue)}
                                checked={!enterpriseValueToEbitdaChecked}
                                changeChecked={() => setEnterpriseValueToEbitdaChecked(!enterpriseValueToEbitdaChecked)}
                                step={0.01}
                                min={filterDetails["enterprise_value_ebitda"][0]}
                                max={filterDetails["enterprise_value_ebitda"][1]}
                            />

                            <Filter
                                element={"Return on Equity"}
                                value={returnOnEquity}
                                changeValue={(event, newValue) => setReturnOnEquity(newValue)}
                                checked={!returnOnEquityChecked}
                                changeChecked={() => setReturnOnEquityChecked(!returnOnEquityChecked)}
                                step={0.01}
                                min={filterDetails["return_on_equity"][0]}
                                max={filterDetails["return_on_equity"][1]}
                            />

                            <Filter
                                element={"Quarterly Revenue Growth"}
                                value={quarterlyRevenueGrowth}
                                changeValue={(event, newValue) => setQuarterlyRevenueGrowth(newValue)}
                                checked={!quarterlyRevenueGrowthChecked}
                                changeChecked={() => setQuarterlyRevenueGrowthChecked(!quarterlyRevenueGrowthChecked)}
                                step={0.01}
                                min={filterDetails["quarterly_revenue_growth"][0]}
                                max={filterDetails["quarterly_revenue_growth"][1]}
                            />

                            <Filter
                                element={"Quarterly Earnings Growth"}
                                value={quarterlyEarningsGrowth}
                                changeValue={(event, newValue) => setQuarterlyEarningsGrowth(newValue)}
                                checked={!quarterlyEarningsGrowthChecked}
                                changeChecked={() => setQuarterlyEarningsGrowthChecked(!quarterlyEarningsGrowthChecked)}
                                step={0.01}
                                min={filterDetails["quarterly_earnings_growth"][0]}
                                max={filterDetails["quarterly_earnings_growth"][1]}
                            />

                            <Filter
                                element={"Total Debt/Equity"}
                                value={totalDebtToEquity}
                                changeValue={(event, newValue) => setTotalDebtToEquity(newValue)}
                                checked={!totalDebtToEquityChecked}
                                changeChecked={() => setTotalDebtToEquityChecked(!totalDebtToEquityChecked)}
                                step={0.01}
                                min={filterDetails["total_debt_equity"][0]}
                                max={filterDetails["total_debt_equity"][1]}
                            />

                            <Filter
                                element={"Forward Annual Dividend Yield"}
                                value={forwardAnnualDividendYield}
                                changeValue={(event, newValue) => setForwardAnnualDividendYield(newValue)}
                                checked={!forwardAnnualDividendYieldChecked}
                                changeChecked={() => setForwardAnnualDividendYieldChecked(!forwardAnnualDividendYieldChecked)}
                                step={0.01}
                                min={filterDetails["forward_annual_dividend_yield"][0]}
                                max={filterDetails["forward_annual_dividend_yield"][1]}
                            />

                            <Filter
                                element={"Trailing Annual Dividend Yield"}
                                value={trailingAnnualDividendYield}
                                changeValue={(event, newValue) => setTrailingAnnualDividendYield(newValue)}
                                checked={!trailingAnnualDividendYieldChecked}
                                changeChecked={() => setTrailingAnnualDividendYieldChecked(!trailingAnnualDividendYieldChecked)}
                                step={0.01}
                                min={filterDetails["trailing_annual_dividend_yield"][0]}
                                max={filterDetails["trailing_annual_dividend_yield"][1]}
                            />

                            <Filter
                                element={"Payout Ratio"}
                                value={payoutRatio}
                                changeValue={(event, newValue) => setPayoutRatio(newValue)}
                                checked={!payoutRatioChecked}
                                changeChecked={() => setPayoutRatioChecked(!payoutRatioChecked)}
                                step={0.01}
                                min={filterDetails["payout_ratio"][0]}
                                max={filterDetails["payout_ratio"][1]}
                            />

                            <Filter
                                element={"Interest Coverage Ratio"}
                                value={interestCoverageRatio}
                                changeValue={(event, newValue) => setInterestCoverageRatio(newValue)}
                                checked={!interestCoverageRatioChecked}
                                changeChecked={() => setInterestCoverageRatioChecked(!interestCoverageRatioChecked)}
                                step={0.01}
                                min={filterDetails["interest_coverage_ratio"][0]}
                                max={filterDetails["interest_coverage_ratio"][1]}
                            />

                            <Filter
                                element={"Operating Cash Flow/Net Income"}
                                value={operatingCashFlowToNetIncome}
                                changeValue={(event, newValue) => setOperatingCashFlowToNetIncome(newValue)}
                                checked={!operatingCashFlowToNetIncomeChecked}
                                changeChecked={() => setOperatingCashFlowToNetIncomeChecked(!operatingCashFlowToNetIncomeChecked)}
                                step={0.01}
                                min={filterDetails["operating_cash_flow_net_income_ratio"][0]}
                                max={filterDetails["operating_cash_flow_net_income_ratio"][1]}
                            />

                            <Filter
                                element={"Free Cash Flow Conversion"}
                                value={freeCashFlowConversion}
                                changeValue={(event, newValue) => setFreeCashFlowConversion(newValue)}
                                checked={!freeCashFlowConversionChecked}
                                changeChecked={() => setFreeCashFlowConversionChecked(!freeCashFlowConversionChecked)}
                                step={0.01}
                                min={filterDetails["free_cash_flow_conversion"][0]}
                                max={filterDetails["free_cash_flow_conversion"][1]}
                            />

                            <Filter
                                element={"Debt Coverage Ratio"}
                                value={debtCoverageRatio}
                                changeValue={(event, newValue) => setDebtCoverageRatio(newValue)}
                                checked={!debtCoverageRatioChecked}
                                changeChecked={() => setDebtCoverageRatioChecked(!debtCoverageRatioChecked)}
                                step={0.01}
                                min={filterDetails["debt_coverage_ratio"][0]}
                                max={filterDetails["debt_coverage_ratio"][1]}
                            />


                            <button onClick={handleSubmit}>Search</button>
                        </div>
                    </div> }
                </main>
            <Footer />
        </>
    );
}

export default Screen;