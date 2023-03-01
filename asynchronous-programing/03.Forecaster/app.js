function attachEvents() {
    let button = document.getElementById('submit').addEventListener('click', onClick)
    let location = document.getElementById('location')
    let code = '';
    let forecast = document.getElementById('forecast')
    let current = document.getElementById('current')
    let upcoming = document.getElementById('upcoming')

    let conditionalSymbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    function onClick(ev) {
        forecast.style.display = 'inline'
        let dataaa = ''
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => res.json())
            .then(data => {
                current.innerHTML = '<div class="label">Current conditions</div>'
                upcoming.innerHTML = '<div class="label">Three-day forecast</div>'
                let city = data.filter((x) => x.name === location.value)[0]
                code = city.code
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                    .then(res => res.json())
                    .then(data => {
                        let condition = data.forecast.condition
                        let resDegrees = data.forecast.low + '&#176' + '/' + data.forecast.high + '&#176'
                        current.innerHTML += `
            <div class="forecasts">
                <span class ="condition symbol">${conditionalSymbols[condition]}</span>
                <span class="condition">
                    <span class="forecast-data">${data.name}</span>
                    <span class="forecast-data">${resDegrees}</span>
                    <span class="forecast-data">${data.forecast.condition}</span>
                </span>
                </div>`})
                    .catch(err => {
                        forecast.children[0].textContent = 'Error'
                        forecast.children[1].textContent = ''
                    })
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                    .then(res => res.json())
                    .then(data => {
                        let forecastInfo = document.createElement('div')
                        forecastInfo.className = 'forecast-info'

                        data.forecast.forEach(el => {
                            let symbol = el.condition
                            let graduses = el.low + '&#176' + '/' + el.high + '&#176'
                            forecastInfo.innerHTML += `
                            
                            <span class="upcoming">
                                <span class="symbol">${conditionalSymbols[symbol]}</span>
                                <span class="forecast-data">${graduses}</span>
                                <span class="forecast-data">${el.condition}</span>
                            </span>
                        `
                        })

                        upcoming.appendChild(forecastInfo)

                    })
                    .catch(err => {
                        forecast.children[0].textContent = 'Error'
                        forecast.children[1].textContent = ''
                    })

            })
            .catch(err => {
                forecast.children[0].textContent = 'Error'
                forecast.children[1].textContent = ''
            })

    }
}
attachEvents();