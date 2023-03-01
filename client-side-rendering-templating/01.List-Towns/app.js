import { html, render } from './node_modules/lit-html/lit-html.js';
const root = document.getElementById('root');
let form = document.querySelector('form')
form.addEventListener('submit', onSubmit)
let ul = document.createElement('ul')


function template(town){
    return html`
    <li>${town}</li>
    `
}
function onSubmit(ev) {
    ev.preventDefault()
    let formData = new FormData(ev.target)
    let towns = formData.get('towns');
    let arr = towns.split(', ')
    render(arr.map(template),ul)
    root.appendChild(ul)
}