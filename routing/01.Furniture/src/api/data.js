import * as api from './api.js';

let endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'create': 'data/catalog',
    'getAllItems': 'data/catalog',
    'getElementById': 'data/catalog/'
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
export async function createFurniture(data) {
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

export async function updateFurniture(id, data) {
    let res = await api.put(endpoints.getElementById + id, data)
    return res
}

export async function delFurniture(id) {
    let res = await api.del(endpoints.getElementById + id)
}

export async function myOwnFurniture() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let userId = user && user._id
    let res = await api.get(endpoints.getAllItems + `?where=_ownerId%3D%22${userId}%22`);
    return res
}
