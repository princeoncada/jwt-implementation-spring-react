import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove("jwtToken");
        sessionStorage.removeItem("auth")
        const delayDuration = 2000;
        const timeoutId = setTimeout(() => {
            navigate("/home");
        }, delayDuration);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <main>
            <p>Logging out...</p>
        </main>
    )
}

export default Logout;