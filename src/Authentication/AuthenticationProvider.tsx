import {useContext,createContext,useState, useEffect} from "react";

interface AuthenticationProviderProps{
    children: React.ReactNode;

}

const AuthenticationContext = createContext({isAuthenticated: false});
export function AuthenticationProvider({children}: AuthenticationProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return(
    <AuthenticationContext.Provider value={{isAuthenticated}}>
        {children}
    </AuthenticationContext.Provider>
    );

}
export const useAuthentication = () => useContext(AuthenticationContext);