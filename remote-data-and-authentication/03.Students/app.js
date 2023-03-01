function students() {
    let tbodyRes = document.querySelector('#results tbody')
    async function reload(){
        try {
            let res2 = await fetch(`http://localhost:3030/jsonstore/collections/students`)
            if (res2.ok == false) {
                throw new Error('Error')
            }
            let data = await res2.json()
            tbodyRes.innerHTML = ''
            for (let i in data) {                    
                tbodyRes.innerHTML += `
                    <tr>
                        <td>${data[i].firstName}</td>
                        <td>${data[i].lastName}</td>
                        <td>${data[i].facultyNumber}</td>
                        <td>${Number(data[i].grade).toFixed(2)}</td>
                    </tr>`
            }
        }
        catch (err) {
            alert(err.message)
        }
        }
         reload()
    document.getElementById('submit').addEventListener('click', submit)

    async function submit(ev) {
        ev.preventDefault()
        let firstName = document.getElementsByClassName('inputs')[0].children[0].value
        let lastName = document.getElementsByClassName('inputs')[0].children[1].value
        let facultyNumber = document.getElementsByClassName('inputs')[0].children[2].value
        let grade = document.getElementsByClassName('inputs')[0].children[3].value
        if (firstName && lastName && facultyNumber && !isNaN(grade) && grade) {
            try {
                let res = await fetch(`http://localhost:3030/jsonstore/collections/students`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        facultyNumber,
                        grade
                    })
                })
                if (res.ok == false) {
                    throw new Error('Error')
                }
            }
            catch (err) {
                alert(err.message)
            }
            await reload()
            document.getElementsByClassName('inputs')[0].children[0].value = ''
            document.getElementsByClassName('inputs')[0].children[1].value = ''
            document.getElementsByClassName('inputs')[0].children[2].value = ''
            document.getElementsByClassName('inputs')[0].children[3].value = ''

        }
    }

}
students()
