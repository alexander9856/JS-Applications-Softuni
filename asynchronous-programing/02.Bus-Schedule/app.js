function solve() {
    let info = document.querySelector('#info span')
    let departBtn = document.getElementById('depart')
    let arriveBtn = document.getElementById('arrive')

    let busStop = {
        "next": "depot"
    }

    function depart() {
        departBtn.disabled = true
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`)
            .then(data => data.json())
            .then(res => {
                busStop = res;
                info.textContent = `Next stop ${busStop.name}`
            })
            .catch(err => {
                info.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })
        arriveBtn.disabled = false;
    }

    function arrive() {
        info.textContent = `Arriving at ${busStop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();