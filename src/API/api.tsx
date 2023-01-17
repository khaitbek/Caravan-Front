import axios from "axios";

type API_ROUTE_TYPES = {
    GET_ALL: string,
    GET_BY_ID: string,
    POST: string | undefined,
    DELETE: string,
    PUT: string
}
type DataParamType = "users" | "orders" | "trucks" | "accounts/register" | "accounts/login"

export const BASE_URL = "http://e-karvon.uz/api";

export const API_ROUTES = {
    USERS: {
        GET_ALL: "users",
        GET_BY_ID: "",
        DELETE: "",
        PUT: ""
    } as API_ROUTE_TYPES,
    TRUCKS: {
        GET_ALL: "/trucks",
        GET_BY_ID: "",
        POST: "",
        DELETE: "",
        PUT: ""
    } as API_ROUTE_TYPES,
    ORDERS: {
        GET_ALL: "/orders",
        GET_BY_ID: "",
        POST: "",
        DELETE: "",
        PUT: ""
    } as API_ROUTE_TYPES,
    AUTH: {
        LOGIN: "/accounts/login",
        REGISTER: "/accounts/register"
    }
}

export function registerUser(user: {}) {
    return axios.post(`${BASE_URL}${API_ROUTES.AUTH.REGISTER}`, user);
}

export function loginUser(user: {}) {
    return axios.post(`http://e-karvon.uz/api/accounts/login`, user);
}

export function getOrders(){
    return axios.get(`${BASE_URL}${API_ROUTES.ORDERS.GET_ALL}`);
}

export function getTrucks() {
    return axios.get(`${BASE_URL}${API_ROUTES.TRUCKS.GET_ALL}`);
}

export function getDatas(type: DataParamType) { 

}

export function postData(type: DataParamType) {

}