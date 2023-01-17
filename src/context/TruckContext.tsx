import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from "react";
import { getOrders, getTrucks } from "../API/api";

type TruckContextProps = {
    trucks: any[],
    setTrucks: Dispatch<SetStateAction<[]>>
}

export const TruckContext = createContext({} as TruckContextProps);

export function TruckProvider({ children }: { children: ReactNode }) {
    const [trucks, setTrucks] = useState<[]>([]);
    useMemo(async() => {
        try {
            const allTrucks = await getTrucks();
            setTrucks(allTrucks.data);
        } catch (error) {
            console.log(error);
            
        }
    }, []);
    return <TruckContext.Provider value={{ trucks, setTrucks }}>
        {children}
    </TruckContext.Provider>
}