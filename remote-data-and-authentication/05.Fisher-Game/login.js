document.getElementById('logout').style.display = 'none'
Array.from(document.getElementsByTagName('a')).forEach(el => el.classList.remove('active'))
document.querySelector('#guest > #login').classList.add('active')
let notification = document.getElementsByClassName('notification')[0]

document.querySelector('#login-view > #login').addEventListener('submit', login)


function login(ev) {
    ev.preventDefault()
    let formData = new FormData(ev.target);
    let email = formData.get('email')
    let password = formData.get('password')
    onLogin(email, password)

}
async function onLogin(email, password) {
    let url = 'http://localhost:3030/users/login'
    let body = { email, password }
    let header = getHeader('post', body)
    try {
        let res = await fetch(url, header)

        let data = await res.json()
        if (data.code !== 200 && data.code) {
            throw new Error(data.message)
        }
        sessionStorage.setItem('email', data.email)
        sessionStorage.setItem('accessToken', data.accessToken)
        sessionStorage.setItem('userId', data._id);
        window.location = '/05.Fisher-Game/index.html'

        return data
    }
    catch (err) {
        notification.textContent = err.message
        setTimeout(() => {
            notification.textContent = ''
        }, 1500)
       
    }
}


function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
