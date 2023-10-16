import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

function Home() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(Cookies.get("jwtToken"));
    }, []);

    function logToken() {
        console.log(token);
    }

    return (
        <>
            <Header/>
            <main>
                <h1>Home</h1>
                <p>This is the home page</p>
            </main>
            <Footer/>
        </>
    )
}

export default Home;