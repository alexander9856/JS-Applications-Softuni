import { get, post } from './api.js'
import { html, render } from './node_modules/lit-html/lit-html.js'

let menu = document.getElementById('menu')
document.querySelector('form').addEventListener('submit', addItem)

function template(option) {
    return html`
    <option value="${option._id}">${option.text}</option>
    `
}


async function repeat() {
    let options = await get();
    let arr = Object.values(options);
    return render(arr.map(template), menu);
}
await repeat()
async function addItem(ev) {
    debugger
    ev.preventDefault()
    let text = document.getElementById('itemText');
    if (text.value) {
        await post({ text: text.value })
    }
    ev.target.reset()
    await repeat()

}

