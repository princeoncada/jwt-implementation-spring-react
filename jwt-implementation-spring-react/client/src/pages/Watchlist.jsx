import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import axios from "axios";
import StockResult from "../components/StockResult.jsx";

function Watchlist() {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/stock`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                "Content-Type": "application/json",
                Accept: "*/*"
            }
        })
            .then((response) => {
                console.log(response.data)
                setStockData(response.data)
            })
            .catch((error) => {
                console.log("API:", error);
                window.location.href = "/logout"
            })
    }, []);

    return (
        <>
            <Header/>
            <main>
                <div className="stock-screen">
                    <h2>Watchlist</h2>
                    <StockResult stockData={stockData} watchlist={true}/>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Watchlist;