export async function get() {
    let res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let data = await res.json();
    return data
}

export async function post(text) {
    try{
        let res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method:'post',
            headers: {
                'Content-Type' : 'application/json',
                'Content-Length' : '<calculated when request is sent>'
            },
            body: JSON.stringify(text)
        })
        if(!res.ok){
            alert('errorrrrrrrr')
            throw new Error
        }
    }
    catch(err){
        alert(err.message)
    }
    
}