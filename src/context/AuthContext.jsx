import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {isTokenValid} from "../helpers/IsTokenValid";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [authenticated, setAuthenticated] = useState({
        authenticated: false,
        user: null,
        status: "pending"
    });
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        const controller = new AbortController();

        async function decodeToken() {
            if (token) {
                const decoded = jwtDecode(token);

                if (isTokenValid(decoded)) {
                    setAuthenticated({
                        authenticated: true,
                        user: {
                            email: decoded.email,
                            roles: decoded.role,
                        },
                        status: "done"
                    });
                    console.log(decoded);

                    await fetchUserData(decoded)

                } else {
                    setAuthenticated({
                        ...authenticated,
                        status: "done"
                    });
                }
            } else {
                handleLogout();
            }
        }

        decodeToken();

        return function cleanup(){
            controller.abort()
        }

    }, []);

    const data = {
        authenticated: authenticated,
        handleLogin,
        handleLogout,
        userData,
        token
    };

    const navigate = useNavigate();

    function handleLogin(userDetails){
        localStorage.setItem('token', userDetails.token);

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        setAuthenticated({
            authenticated: true,
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles,
            },
            status: "done",
        });
        console.log("We logging in");
        fetchUserData(decoded)

        navigate("/profile")
    }

    async function fetchUserData(decodedToken) {
        try {
            const response = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/users", {
                headers: {
                    'novi-education-project-id': 'd83f1d14-c828-41b5-940b-c58d139b7820'
                }
            });
            const userData = response.data.find((id) => id.id === decodedToken.userId);

            if (userData) {
                setUserData(userData);
            }

        } catch (e) {
            console.error(e);
        }
    }

    function handleLogout(){
        localStorage.removeItem('token');
        setAuthenticated({
            authenticated: false,
            user: null,
            status: "done",
        });
        console.log("We logging out");
        setUserData({})
        console.log(authenticated)

        navigate("/");
    }

    return (
        <AuthContext.Provider value={ data }>
            {authenticated.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;