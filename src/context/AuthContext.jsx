import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const data = {
        authenticated: isAuthenticated,
        handleLogin,
        handleLogout,
    }

    function handleLogin(){
        setIsAuthenticated(true);
        console.log("We logging in");
    }

    function handleLogout(){
        setIsAuthenticated(false);
        console.log("We logging out");
    }

    return (
        <AuthContext.Provider value={ data }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;