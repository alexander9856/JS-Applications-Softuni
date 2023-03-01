import * as api from './api.js';

let endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'create': 'data/cars/',
    'getAllItems': 'data/cars?sortBy=_createdOn%20desc',
    'getElementById': 'data/cars/'
}
export async function login(username, password) {
    let user = await api.post(endpoints.login, { username, password })
    sessionStorage.setItem('user', JSON.stringify(user))
}
export async function register(username, password) {
    let user = await api.post(endpoints.register, { username, password })
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

export async function getMyListings(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(user){
        let userId = user._id;
        let res = await api.get(`data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        return res

    }
}

export async function getByQuery(query){
    let res = await api.get(`data/cars?where=year%3D${query}`);
    return res
}