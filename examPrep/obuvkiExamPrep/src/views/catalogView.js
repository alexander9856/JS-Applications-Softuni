import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
// import { getElementById } from '../api/data.js'
let page = null;

export async function catalogView(ctx) {
    debugger
    page = ctx.page
    let data = await getAllItems()
    ctx.render(catalogTemp(data))
}

function catalogTemp(data) {
    return html`
    <section id="dashboard">
        <h2>Collectibles</h2>
        ${
            data.length > 0 ? 
        html`
        <ul class="card-wrapper">
            ${data.map(x => createItemTemp(x))}
        </ul>` :
         html`
         <h2>There are no items added yet.</h2>`}
        </section>
    `
}

function createItemTemp(data) {
    
    let itemImg = data.imageUrl.split('/').pop()

    return html`
    <li class="card">
              <img src="${"/images/" + itemImg}" alt="back2future" />
              <p><strong>Brand: </strong><span class="brand">${data.brand}</span></p>
              <p>
                <strong>Model: </strong
                ><span class="model">${data.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
              <a class="details-btn" href="/details/${data._id}">Details</a>
            </li>`
}
