import '../styles/Analysis.css'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Table from "../components/Table.jsx";
import React, {useEffect, useState} from "react";
import List from "../components/List.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import AnalysisView from "../components/AnalysisView.jsx";

function Analysis() {
    const { ticker } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        if(!isLoading) {
            setIsLoading(true)
            console.log("Requesting Data...")
            axios.get(`http://localhost:8000/api/stock/${ticker}`)
                .then((response) => {
                    const jsonObject = JSON.parse(response.data["stockData"]);
                    setStockData(jsonObject)
                    setIsLoading(false);
                    console.log("Data Retrieved!")
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log("API:", error);
                })
        }
    }, []);

    return (
        <>
            <Header />
            <main>
                { (!isLoading && stockData !== null) ? <AnalysisView stockData={stockData}/> : <div className="loading">Loading...</div> }
            </main>
            <Footer />
        </>
    );
}

export default Analysis;