import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from "react";
import { getOrders } from "../API/api";

type OrderContextProps = {
    orders: any[],
    setOrders: Dispatch<SetStateAction<[]>>
}

export const OrderContext = createContext({} as OrderContextProps);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<[]>([]);
    useMemo(async() => {
        const allOrders = await getOrders();
        setOrders(allOrders.data);
    }, []);
    return <OrderContext.Provider value={{ orders, setOrders }}>
        {children}
    </OrderContext.Provider>
}