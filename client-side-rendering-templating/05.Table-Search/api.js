export async function getData(){
    let res = await fetch('http://localhost:3030/jsonstore/advanced/table');
    let data = await res.json()
    return data
}