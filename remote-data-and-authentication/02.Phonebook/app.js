function attachEvents() {
    let ulInfo = document.getElementById('phonebook')
    ulInfo.addEventListener('click', del)

    document.getElementById('btnCreate').addEventListener('click', add)

    document.getElementById('btnLoad').addEventListener('click', load)

    async function load(ev) {
        try {
            let res = await fetch('http://localhost:3030/jsonstore/phonebook')
            if (res.ok == false) {
                throw new Error('Error')
            }
            let data = await res.json()
            ulInfo.innerHTML = ''
            for (let i in data) {
                ulInfo.innerHTML += `<li>${data[i].person}: ${data[i].phone}<button id="${data[i]._id}">Delete</button></li>`
            }
        }
        catch (err) {
            alert(err.message)
        }
    }
    async function del(ev) {
        let id = ev.target.id
        if (ev.target.tagName == 'BUTTON') {
            try {
                let data = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
                    method: 'delete'
                })
                if (data.ok == false) {
                    throw new Error('Error')
                }
            }
            catch (err) {
                alert(err.message)
            }
            await load()
        }
    }
    async function add(ev) {
        let person = document.getElementById('person').value
        let phone = document.getElementById('phone').value
        if(person && phone){
            try{
                let res = await fetch('http://localhost:3030/jsonstore/phonebook',{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        person,
                        phone
                    })
                })
                if (res.ok == false){
                    throw new Error(err)
                }
            }
            catch(err){
                alert(err.message)
            }  
        }
        document.getElementById('person').value = ''
        document.getElementById('phone').value = ''
        await load()
    }
}
attachEvents();