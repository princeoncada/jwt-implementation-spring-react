import React, {useEffect, useState} from 'react';
import '../styles/Search.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import StockResult from "../components/StockResult.jsx";
import Cookies from "js-cookie";

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/stock/top`)
            .then((response) => {
                console.log(response.data)
                setResults(response.data)
            })
            .catch((error) => {
                console.log("API:", error);
            })
    }, [])

    function handleChange(e){
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^A-Z]/g, "");
        setQuery(sanitizedValue);
    }

    return (
        <>
            <Header />
                <main>
                    <div className="stock-search">
                        <h2>Stock Search</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter a stock ticker symbol..."
                                value={query}
                                onChange={(e) => handleChange(e)}
                            />
                            <button
                                onClick={() => {
                                    window.location.href = `/stock/view/${query}`
                                }}
                            >Search</button>
                        </div>
                        <h3>Recommended Stocks</h3>
                        <StockResult stockData={results} />
                    </div>
                </main>
            <Footer />
        </>
    );
}

export default Search
