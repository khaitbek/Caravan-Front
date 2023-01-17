import { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

type UserProviderProps = {
    children: ReactNode
}

type UserContextProps = {
    user: {}
    setUser: Dispatch<SetStateAction<{}>>
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")!) || {});
    useEffect(() => {
        if (!user) return localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}