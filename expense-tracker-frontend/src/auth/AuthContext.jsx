import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {

        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
            setUser(jwtDecode(savedToken));

        }

    }, []);

    function login(jwt) {

        localStorage.setItem("token", jwt);

        setToken(jwt);

        setUser(jwtDecode(jwt));
    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {
    return useContext(AuthContext);
}