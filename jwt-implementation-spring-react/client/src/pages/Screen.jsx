import '../styles/Screen.css'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Screen() {
    return (
        <>
            <Header />
                <main>
                    <div className="stock-screen">
                        <h2>Stock Screening</h2>
                        <form>
                            <div className="filter">
                                <label>Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                />
                            </div>
                            <div className="filter">
                                <label>Volume:</label>
                                <input
                                    type="number"
                                    name="volume"
                                />
                            </div>
                            <div className="filter">
                                <label>Market Cap:</label>
                                <input
                                    type="number"
                                    name="marketCap"
                                />
                            </div>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </main>
            <Footer />
        </>
    );
}

export default Screen;