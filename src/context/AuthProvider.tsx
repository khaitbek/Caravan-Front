import { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

type AuthProviderProps = {
    children: ReactNode
}

type AuthContextProps = {
    token: {}
    setToken: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState(localStorage.getItem("token")! || "");

    return <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>
}