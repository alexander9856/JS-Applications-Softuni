document.querySelector('#register-view > #register').addEventListener('submit', register)
Array.from(document.getElementsByTagName('a')).forEach(el => el.classList.remove('active'))
document.getElementById('logout').style.display = 'none'

document.querySelector('#guest > #register').classList.add('active')

let notification = document.getElementsByClassName('notification')[0]

function register(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let email = formData.get('email')
    let password = formData.get('password')
    let rePass = formData.get('rePass')

    if (password !== rePass || email == '' || password == ''|| rePass == '') {
        notification.textContent = 'Error'
        setTimeout(() => {
            notification.textContent = ''
        }, 1500)
    }
    else{
        onRegister(email,password)
    }

}
async function onRegister(email, password) {
    let url = 'http://localhost:3030/users/register'
    let body = { email, password }
    let header = getHeader('post', body)

    try{
        let res = await fetch(url, header)
       
        let data = await res.json()
        if(data.code !== 200 && data.code){
            throw new Error(data.message)
        }
        sessionStorage.setItem('email',data.email)
        sessionStorage.setItem('accessToken',data.accessToken)
        sessionStorage.setItem('userId', data._id);
        window.location = '/05.Fisher-Game/index.html'

        return data
    }
    catch(err){
        notification.textContent = err.message
        setTimeout(() => {
            notification.textContent = ''
        },1500)
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