import * as api from './api.js';

let endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'create': 'data/shoes',
    'getAllItems': 'data/shoes?sortBy=_createdOn%20desc',
    'getElementById': 'data/shoes/'
}
export async function login(email, password) {
    let user = await api.post(endpoints.login, { email, password })
    sessionStorage.setItem('user', JSON.stringify(user))
}
export async function register(email, password) {
    let user = await api.post(endpoints.register, { email, password })
    sessionStorage.setItem('user', JSON.stringify(user))

}
export async function logout() {
    await api.get(endpoints.logout)
    sessionStorage.removeItem('user')
}
export async function createPair(data) {
    let res = await api.post(endpoints.create, data)
    return res
}

export async function getAllItems() {
    let res = await api.get(endpoints.getAllItems)
    return res
}

export async function getElementById(id) {
    let res = await api.get(endpoints.getElementById + id)
    return res
}

export async function updateShoe(id, data) {
    let res = await api.put(endpoints.getElementById + id, data)
    return res
}

export async function delShoe(id) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
        await api.del(endpoints.getElementById + id)
    }

}

export async function getModel(brand) {
    let res = await api.get(`data/shoes?where=brand%20LIKE%20%22${brand}%22`);
    return res
}
