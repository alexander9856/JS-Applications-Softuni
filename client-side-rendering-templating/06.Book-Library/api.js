export async function getData() {
    let res = await fetch('http://localhost:3030/jsonstore/collections/books');
    let data = res.json();
    return data
}

export async function postData(title, author) {
    try {
        let res = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        })
    }
    catch (err) {
        alert(err.message)
    }
}

export async function getBook(id) {
    let res = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    let data = await res.json()
    return data
}


export async function updateBook(id, title, author) {
    try {
        let res = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        })
    }
    catch (err) {
        alert(err.message)
    }
}


export async function deleteBook(id) {
    let res = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    })
}