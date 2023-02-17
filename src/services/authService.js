import http from './httpService';
import config from '../config.json';
import jwt_decode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}


export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}


export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwt_decode(jwt);
        return user;
    } catch (ex) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getJwt() {
    return localStorage.getItem(tokenKey);

}

const auth = {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
};

export default auth;

