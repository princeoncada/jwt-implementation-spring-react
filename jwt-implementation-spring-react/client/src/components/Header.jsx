import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav className="nav">
                <div className="nav__links">
                    <Link to="/">
                        <div className="nav__link">Home</div>
                    </Link>
                    <div>|</div>
                    <Link to="/about">
                        <div className="nav__link">Stock Screen</div>
                    </Link>
                    <div>|</div>
                    <Link to="/contact">
                        <div className="nav__link">Stock Analysis</div>
                    </Link>
                    <div>|</div>
                    <Link to="/logout">
                        <div className="nav__link">Logout</div>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;