async function getInfo() {
    // let checkBtn = document.getElementById('submit').addEventListener('click', check)
    let stopID = document.getElementById('stopId')
    let nameOfStop = document.getElementById('stopName')
    let buses = document.getElementById('buses')

    nameOfStop.innerHTML = ''
    buses.innerHTML = ''
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`);
        let data = await response.json()
        nameOfStop.innerHTML = data.name
        for (let i in data.buses){
            console.log(i)
            buses.innerHTML += `<li>Bus ${i} arrives in ${data.buses[i]} minutes</li>`
        }
    }
    catch (err) {
        nameOfStop.textContent = 'Error'
        buses.innerHTML = ''
    }
    // fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         nameOfStop.innerHTML = data.name
    //         buses.innerHTML = ''
    //         for (let i in data.buses) {
    //             console.log(i)

    //             buses.innerHTML += `<li>Bus ${i} arrives in ${data.buses[i]} minutes</li>`
    //         }
    //     })
    //     .catch(err => {
    //         nameOfStop.textContent = 'Error'
    //         buses.innerHTML = ''
    //      })



}
