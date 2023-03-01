window.addEventListener('DOMContentLoaded', onLoadHTML)
document.getElementById('logout').addEventListener('click', logout)
document.querySelector('.load').addEventListener('click', loadAllCaches)

let catches = document.getElementById('catches')

async function logout(ev) {
    let url = 'http://localhost:3030/users/logout'
    let header = getHeader('GET', '')
    let response = await fetch(url, header)
    sessionStorage.clear()
    onLoadHTML()
}

async function loadAllCaches() {
    let url = 'http://localhost:3030/data/catches';
    let res = await fetch(url);
    let data = await res.json();

    catches.innerHTML = ''
    try {
        displayCatches(data)
    }
    catch (err) {
        alert(err.message)
    }

}
function displayCatches(data) {
    let token = sessionStorage.getItem('accessToken')
    let email = sessionStorage.getItem('email')
    let userId = sessionStorage.getItem('userId')

    data.forEach(el => {
        let catche = document.createElement('div');
        catche.className = 'catch';
        catche.innerHTML += `
            <label>Angler</label>
            <input type="text" class="angler" value="${el.angler}">
            <label>Weight</label>
            <input type="text" class="weight" value="${el.weight}">
            <label>Species</label>
            <input type="text" class="species" value="${el.species}">
            <label>Location</label>
            <input type="text" class="location" value="${el.location}">
            <label>Bait</label>
            <input type="text" class="bait" value="${el.bait}">
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${el.captureTime}">`
        let updateBtn = document.createElement('button')
        updateBtn.className = 'update';
        updateBtn.textContent = 'Update';
        updateBtn.setAttribute("data-id", el._id);


        let deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute("data-id", el._id);


        if (token != null && userId != null && el._ownerId == userId) {
            updateBtn.addEventListener('click', update)
            deleteBtn.addEventListener('click', del)
        }
        else {
            updateBtn.disabled = true
            deleteBtn.disabled = true
            catche.children[1].disabled = true
            catche.children[3].disabled = true
            catche.children[5].disabled = true
            catche.children[7].disabled = true
            catche.children[9].disabled = true
            catche.children[11].disabled = true
        }
        catche.appendChild(updateBtn)
        catche.appendChild(deleteBtn)
        catches.appendChild(catche)
    })
}

async function update(ev) {
    let angler = ev.target.parentNode.children[1].value
    let weight = Number(ev.target.parentNode.children[3].value)
    let species = ev.target.parentNode.children[5].value
    let location = ev.target.parentNode.children[7].value
    let bait = ev.target.parentNode.children[9].value
    let captureTime = Number(ev.target.parentNode.children[11].value)

    let dataId = ev.target.dataset.id
    let url = `http://localhost:3030/data/catches/${dataId}`
    if (angler && weight && species && location && bait && captureTime) {
        let headers = getHeader('PUT', { angler, weight, species, location, bait, captureTime })
        let res = await fetch(url, headers)
    }
    loadAllCaches()
}
async function del(ev) {
    let dataId = ev.target.dataset.id
    let url = `http://localhost:3030/data/catches/${dataId}`
    let headers = getHeader('delete','');
    let res = await fetch(url, headers)
    loadAllCaches()
}
function onLoadHTML() {
    let token = sessionStorage.getItem('accessToken')
    let greeting = document.querySelector('p.email span')
    if (token) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
        greeting.textContent = sessionStorage.getItem('email')
        document.querySelector('.add').disabled = false;
        document.getElementById('addForm').addEventListener('submit', addNewCatche)
    }
    else {
        document.querySelector('.add').disabled = true;
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('logout').style.display = 'none'
        greeting.textContent = 'guest'
    }
    loadAllCaches()
}

async function addNewCatche(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let angler = formData.get('angler')
    let weight = formData.get('weight')
    let species = formData.get('species');
    let location = formData.get('location');
    let bait = formData.get('bait');
    let captureTime = formData.get('captureTime');

    if (angler && weight && species && location && bait && captureTime) {
        let url = 'http://localhost:3030/data/catches'
        let headers = getHeader('POST', { angler, weight, species, location, bait, captureTime })
        let res = await fetch(url, headers)
        ev.target.reset()
        loadAllCaches()
    }
}
function getHeader(method, body) {
    let token = sessionStorage.getItem('accessToken')
    let header = {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    }
    if (body) {
        header.body = JSON.stringify(body)
    }
    return header
}
