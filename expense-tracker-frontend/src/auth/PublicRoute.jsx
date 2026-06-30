import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PublicRoute({ children }) {

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;