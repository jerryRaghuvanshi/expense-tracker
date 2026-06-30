import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function OAuthSuccess() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            login(token);          // <-- updates state + localStorage
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, []);

    return (

        <div className="flex h-screen items-center justify-center">

            <h2 className="text-xl">

                Signing you in...

            </h2>

        </div>

    );

}

export default OAuthSuccess;