import * as api from './api.js';

let endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'create': 'data/albums',
    'getAllItems': 'data/albums?sortBy=_createdOn%20desc',
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
export async function createPost(data) {
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

export async function updateAd(id, data) {
    let res = await api.put(endpoints.getElementById + id, data)
    return res
}

export async function delPost(id) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        await api.del(endpoints.getElementById + id)
    }

}

export async function like(albumId) {
    let res = await api.post('data/likes', albumId)
    return res
}

export async function getAllLikes(id) {
    let res = await api.get(`data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`)
    return res
}
export async function getLikesFromCurrentUser(id) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let userId = user && user._id;
    if (user) {
        let res = await api.get(`data/likes?where=albumId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`)
        return res
    }
}

