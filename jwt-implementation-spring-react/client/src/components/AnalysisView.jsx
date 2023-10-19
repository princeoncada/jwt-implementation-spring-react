import Table from "./Table.jsx";
import List from "./List.jsx";
import React, {useEffect, useState} from "react";
import {Button, styled} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from "axios";
import Cookies from "js-cookie";

const CustomButton = styled(Button)({
    flex: "1"
})

function AnalysisView({ stockData }) {

    const [financialView, setFinancialView] = useState({
        incomeStatement: true,
        balanceSheet: false,
        cashFlow: false,
    });

    const [userHas, setUserHas] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/stock/${stockData.details["Ticker"]}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                "Content-Type": "application/json",
                Accept: "*/*"
            }
        })
            .then((response) => {
                setUserHas(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    function handleAddStock() {
        axios.post(`http://localhost:8000/api/user/stock`, {
            "ticker": stockData.details["Ticker"]
        },{
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                "Content-Type": "application/json",
                Accept: "*/*"
            }
        })
            .then((response) => {
                setUserHas(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleRemoveStock() {
        axios.delete(`http://localhost:8000/api/user/stock/${stockData.details["Ticker"]}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                "Content-Type": "application/json",
                Accept: "*/*"
            }
        })
            .then((response) => {
                setUserHas(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleView(element) {
        if (element === 'incomeStatement') {
            setFinancialView({
                incomeStatement: true,
                balanceSheet: false,
                cashFlow: false,
            });
        } else if (element === 'balanceSheet') {
            setFinancialView({
                incomeStatement: false,
                balanceSheet: true,
                cashFlow: false,
            });
        } else if (element === 'cashFlow') {
            setFinancialView({
                incomeStatement: false,
                balanceSheet: false,
                cashFlow: true,
            });
        }
    }

    return (
        <div className="stock-view">
            <div className={`stock-view-container`}>
                <div className={`stock-view-container first`}>
                    <div className="stock-summary">
                        <div className="contents">
                            <div className="stock-identity">
                                <div className="stock-name">{stockData.details["Name"]}</div>
                                <div className="stock-ticker">{stockData.details["Ticker"]}</div>
                            </div>
                            <div className="stock-score">
                                <div className="score">
                                    <div className={`score-value score-${stockData.score["value"]}`}>{stockData.score["value"]}</div>
                                    <div className="score-label">Value</div>
                                </div>
                                <div className="score">
                                    <div className={`score-div score-${stockData.score["dividend"]}`}>{stockData.score["dividend"]}</div>
                                    <div className="score-label">Dividend</div>
                                </div>
                                <div className="score">
                                    <div className={`score-growth score-${stockData.score["growth"]}`}>{stockData.score["growth"]}</div>
                                    <div className="score-label">Growth</div>
                                </div>
                            </div>
                            <div className="stock-price">${stockData.details["Price"]}</div>
                        </div>
                    </div>

                    <div className="btn-container">
                        {
                            !userHas ? <CustomButton
                                variant="contained"
                                onClick={() => { handleAddStock() }}
                            >
                                <AddCircleIcon /> &nbsp;&nbsp; Add Stock
                            </CustomButton> : <CustomButton
                                variant="contained"
                                color="error"
                                onClick={() => { handleRemoveStock() }}
                            >
                                <RemoveCircleIcon /> &nbsp;&nbsp; Remove Stock
                            </CustomButton>
                        }
                    </div>

                    <div className={`stock-financial`}>
                        <div className={`financial-navigation`}>

                            <div
                                onClick={() => handleView("incomeStatement")}
                                className={`item ${financialView["incomeStatement"] ? "clicked" : ""}`}
                            >Income Statement</div>
                            <div
                                onClick={() => handleView("balanceSheet")}
                                className={`item ${financialView["balanceSheet"] ? "clicked" : ""}`}
                            >Balance Sheet</div>
                            <div
                                onClick={() => handleView("cashFlow")}
                                className={`item ${financialView["cashFlow"] ? "clicked" : ""}`}
                            >Cash Flow</div>

                        </div>
                        {financialView["incomeStatement"] ? <Table data={stockData.financials["income_statement"]} /> : null}
                        {financialView["balanceSheet"] ? <Table data={stockData.financials["balance_sheet"]} /> : null}
                        {financialView["cashFlow"] ? <Table data={stockData.financials["cash_flow"]} /> : null}
                    </div>
                </div>
                <div className={`stock-view-container second`}>
                    <div className={`stock-details`}>
                        <h2>Stock Details: </h2>
                        <List data={stockData.details} />
                    </div>
                    <div className={`stock-statistics`}>
                        <h2>Stock Statistics: </h2>
                        <List data={stockData.statistics} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalysisView