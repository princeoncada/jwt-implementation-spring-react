import React, { useState } from 'react';
import '../styles/Search.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        // You can implement your stock search logic here.
        // For simplicity, let's simulate a delay with setTimeout.
        setLoading(true);

        setTimeout(() => {
            // Simulate search results
            const dummyResults = [
                'AAPL - Apple Inc.',
                'GOOGL - Alphabet Inc.',
                'MSFT - Microsoft Corporation',
                'AMZN - Amazon.com Inc.',
                'TSLA - Tesla, Inc.',
            ];
            setResults(dummyResults);
            setLoading(false);
        }, 2000);
    };

    return (
        <>
            <Header />
                <main>
                    <div className="stock-search">
                        <h2>Stock Search</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter a stock symbol..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul className="search-results">
                                {results.map((result) => (
                                    <li key={result}>{result}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
            <Footer />
        </>
    );
}

export default Search
