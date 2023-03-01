import * as api from './api.js';

let endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'create': 'data/albums',
    'getAllItems': 'data/albums?sortBy=_createdOn%20desc&distinct=name',
    'getElementById': 'data/albums/'
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

export async function updateItem(id, data) {
    let res = await api.put(endpoints.getElementById + id, data)
    return res
}

export async function delItem(id) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        await api.del(endpoints.getElementById + id)
    }

}

export async function getModel(brand) {
    let res = await api.get(`data/shoes?where=brand%20LIKE%20%22${brand}%22`);
    return res
}

export async function getByQuery(query) {
    if (query) {
        let res = await api.get(`data/albums?where=name%20LIKE%20%22${query}%22`);
        return res
    }

}
