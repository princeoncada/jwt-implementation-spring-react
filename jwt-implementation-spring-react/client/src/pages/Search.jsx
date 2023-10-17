import React, {useEffect, useState} from 'react';
import '../styles/Search.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";

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
                        <ul className="search-results">
                            {results.map((result, index) => (
                                <li key={result.id} onClick={() => {
                                    window.location.href = `/stock/view/${result["ticker"]}`
                                }} className="result-item">
                                    <div className="result-left">
                                        <span>{`${result["ticker"]}`}</span>
                                        <span>{`|`}</span>
                                        <span>{`${result.name}`}</span>
                                    </div>
                                    <div className="result-middle">
                                        <div className="score">
                                            <div className={`score-value score-${result.value}`}>{result.value}</div>
                                            <div className="score-label">Value</div>
                                        </div>
                                        <div className="score">
                                            <div className={`score-div score-${result.dividend}`}>{result.dividend}</div>
                                            <div className="score-label">Dividend</div>
                                        </div>
                                        <div className="score">
                                            <div className={`score-growth score-${result.growth}`}>{result.growth}</div>
                                            <div className="score-label">Growth</div>
                                        </div>
                                    </div>
                                    <div className="result-right">
                                        <p>${result.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </main>
            <Footer />
        </>
    );
}

export default Search
