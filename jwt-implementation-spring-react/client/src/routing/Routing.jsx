import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import {useState} from "react";
import Protected from "../components/Protected.jsx";
import Home from "../pages/Home.jsx";
import Authenticate from "../redirects/Authenticate.jsx";
import Logout from "../redirects/Logout.jsx";
import Analysis from "../pages/Analysis.jsx";
import Screen from "../pages/Screen.jsx";
import Search from "../pages/Search.jsx";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ sessionStorage.getItem("auth") === "true" ? <Navigate to="/home"/> : <Login />} />

                <Route path="/stock/search" element={
                    <Protected>
                        <Search/>
                    </Protected>
                } />

                <Route path="/home" element={
                    <Protected>
                        <Home/>
                    </Protected>
                } />

                <Route path="/stock/screen" element={
                    <Protected>
                        <Screen/>
                    </Protected>
                } />

                <Route path="/stock/view/:ticker" element={
                    <Protected>
                        <Analysis/>
                    </Protected>
                } />

                <Route path="/logout" element={<Logout />} />
                <Route path="/authenticate" element={<Authenticate />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing