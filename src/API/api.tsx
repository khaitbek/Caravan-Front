type API_ROUTE_TYPES = {
    GET_ALL: string,
    GET_BY_ID: string,
    POST: string | undefined,
    DELETE: string,
    PUT: string
}
type DataParamType = "users" | "orders" | "trucks" | "accounts/register" | "accounts/login"

export const BASE_URL = "";

export const API_ROUTES = {
    USERS: {
        GET_ALL: "users",
        GET_BY_ID: "",
        DELETE: "",
        PUT: ""
    } as API_ROUTE_TYPES,
    TRUCKS: {
        GET_ALL: "trucks",
        GET_BY_ID: "",
        POST: "",
        DELETE: "",
        PUT: ""
    } as API_ROUTE_TYPES,
    ORDERS: {
        GET_ALL: "orders",
        GET_BY_ID: "",
        POST: "",
        DELETE: "",
        PUT: ""
    } as API_ROUTE_TYPES,
    AUTH: {
        LOGIN: "",
        REGISTER: ""
    }
}

export function registerUser(user: {}) {

}

export function loginUser(user: {}) {

}

export function getDatas(type: DataParamType) {

}

export function postData(type: DataParamType) {

}