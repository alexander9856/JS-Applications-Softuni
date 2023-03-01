import { getData, postData, getBook, updateBook, deleteBook } from './api.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

document.getElementById('loadBooks').addEventListener('click', showData);
let tbody = document.querySelector('tbody');
let addForm = document.getElementById('add-form')
let editForm = document.getElementById('edit-form')

function template(tr) {
    return html`
    <tr>
    <td>${tr.title}</td>
    <td>${tr.author}</td>
    <td>
        <button id="${tr.id}" @click=${edit}>Edit</button>
        <button id="${tr.id}" @click=${del}>Delete</button>
    </td>
    </tr>
    `
}
async function showData(ev) {
    ev.preventDefault();
    let data = await getData();
    let arr = [];
    for (let i in data) {
        arr.push({ id: i, author: data[i].author, title: data[i].title })
    }
    render(arr.map(template), tbody);
}

addForm.addEventListener('submit', post);
editForm.addEventListener('submit', onEdit)

async function post(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target)
    let title = formData.get('title');
    let author = formData.get('author')
    if (title && author) {
        await postData(title, author);
        document.getElementById('loadBooks').click()
        ev.target.reset()
    }
    else {
        alert('All fields are required!')
    }
}
let id;
async function edit(ev) {
    id = ev.target.id
    let book = await getBook(id)
    addForm.style.display = 'none';
    editForm.style.display = 'block';
    document.getElementById('editTitle').value = book.title
    document.getElementById('editAuthor').value = book.author
}
async function onEdit(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let title = formData.get('title');
    let author = formData.get('author');
    await updateBook(id, title, author);
    document.getElementById('loadBooks').click()
    ev.target.reset();

    addForm.style.display = 'block';
    editForm.style.display = 'none';
}

async function del(ev) {
    id = ev.target.id
    await deleteBook(id)
    document.getElementById('loadBooks').click()
}


