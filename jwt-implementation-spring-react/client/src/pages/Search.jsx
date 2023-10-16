import React, { useState } from 'react';
import '../styles/Search.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([
        {
            "ticker": "GOOGL",
            "name": "Alphabet",
            "score": {
                "div": 3,
                "val": 4,
                "growth": 5
            },
            "price": 2754.39
        },
        {
            "ticker": "MSFT",
            "name": "Microsoft",
            "score": {
                "div": 3,
                "val": 4,
                "growth": 4
            },
            "price": 325.25
        },
        {
            "ticker": "AMZN",
            "name": "Amazon",
            "score": {
                "div": 2,
                "val": 4,
                "growth": 5
            },
            "price": 3360.99
        }
    ]);

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
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button>Search</button>
                        </div>
                        <h3>Recommended Stocks</h3>
                        <ul className="search-results">
                            {results.map((result, index) => (
                                <li onClick={() => {
                                    console.log(result.name);
                                }} className="result-item">
                                    <div className="result-left">
                                        <span>{`${result.ticker}`}</span>
                                        <span>{`|`}</span>
                                        <span>{`${result.name}`}</span>
                                    </div>
                                    <div className="result-middle">
                                        <div className="score">
                                            <div className={`score-value score-${result.score.val}`}>{result.score.val}</div>
                                            <div className="score-label">Value</div>
                                        </div>
                                        <div className="score">
                                            <div className={`score-div score-${result.score.div}`}>{result.score.div}</div>
                                            <div className="score-label">Dividend</div>
                                        </div>
                                        <div className="score">
                                            <div className={`score-growth score-${result.score.growth}`}>{result.score.growth}</div>
                                            <div className="score-label">Growth</div>
                                        </div>
                                    </div>
                                    <div className="result-right">
                                        <p>$ {result.price}</p>
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
