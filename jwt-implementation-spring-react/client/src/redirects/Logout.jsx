import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Logout({ setAuthenticated }) {
    const navigate = useNavigate();
    Cookies.remove("jwtToken");

    useEffect(() => {
        setAuthenticated(false);
        navigate("/")
    }, []);

    return (
        <main>
        </main>
    )
}

export default Logout;