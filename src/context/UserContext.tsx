import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type UserProviderProps = {
    children: ReactNode
}

type UserContextProps = {
    user: {}
    setUser: Dispatch<SetStateAction<{}>>
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState({});
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}