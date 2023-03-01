import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
import { getElementById } from '../api/data.js'
let page = null;

export async function catalogView(ctx) {
    page = ctx.page
    let data = await getAllItems()
    ctx.render(catalogTemp(data))
}

function catalogTemp(data) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(x => createItemTemp(x))}
    </div>
    `
}

function createItemTemp(itemDetails) {
    let itemImg = itemDetails.img.split('/').pop()

    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${"./images/" + itemImg}" />
                <p>${itemDetails.description}</p>
                <footer>
                    <p>Price: <span>${itemDetails.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${itemDetails._id}" class="btn btn-info">Details</a>.
                </div>`
}
