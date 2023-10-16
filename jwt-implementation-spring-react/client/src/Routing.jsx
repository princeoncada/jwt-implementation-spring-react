import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import {useState} from "react";
import Protected from "./components/Protected.jsx";
import Home from "./pages/Home.jsx";
import Authenticate from "./redirects/Authenticate.jsx";
import Logout from "./redirects/Logout.jsx";
import Analysis from "./pages/Analysis.jsx";
import Screen from "./pages/Screen.jsx";
import Search from "./pages/Search.jsx";

function Routing() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<Login />} />*/}
                <Route path="/stock/screen" element={<Screen />} />
                <Route path="/stock/search" element={<Search />} />
                <Route path="/stock/view/:ticker" element={<Analysis />} />
                <Route path="/" element={<Home />} />

                <Route path="/home" element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <Home/>
                    </Protected>
                } />

                <Route path="/logout" element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <Logout setAuthenticated={setAuthenticated}/>
                    </Protected>
                } />

                <Route path="/authenticate" element={<Authenticate setAuthenticated={setAuthenticated}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing