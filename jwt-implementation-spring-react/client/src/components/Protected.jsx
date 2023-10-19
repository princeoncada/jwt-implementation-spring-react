import React from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
    if (sessionStorage.getItem("auth") !== "true") {
        return <Navigate to="/logout" />;
    }
    return children;
}
export default Protected;
