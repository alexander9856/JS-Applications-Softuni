function attachEvents() {
    let textArea = document.getElementById('messages')
    let submitBtn = document.getElementById('submit')
    let refreshBtn = document.getElementById('refresh')

    submitBtn.addEventListener('click', async (ev) => {
        let author = document.querySelector('#controls').children[1].value
        let content = document.querySelector('#controls').children[4].value
        try {
            let res = await fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author,
                    content
                })
            })
            refreshBtn.click()
            if (res.ok == false) {
                throw new Error('Error')
            }

        }
        catch (err) {
            alert(err.message)
        }
    })
    refreshBtn.addEventListener('click', async (ev) => {
        try {
            let res = await fetch('http://localhost:3030/jsonstore/messenger')
            if (res.ok == false) {
                throw new Error('Error')
            }
            let comments = [];
            let data = await res.json()
            for (let i in data) {
                comments.push(`${data[i].author}: ${data[i].content}`)
            }
            textArea.innerHTML = comments.join('\n')
        }
        catch (err) {
            alert(err.message)
        }

    })
}
attachEvents();