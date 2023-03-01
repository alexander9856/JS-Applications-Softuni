import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
// import { getElementById } from '../api/data.js'
let page = null;

export async function catalogView(ctx) {
    debugger
    page = ctx.page
    let data = await getAllItems()
    let user = JSON.parse(sessionStorage.getItem('user'))

    ctx.render(catalogTemp(data))
}

function catalogTemp(data) {
    return html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            ${data.length > 0 ? html`${data.map(createItemTemp)}` : html`<p class="no-cars">No cars in database.</p>`}
            <!-- Display all records -->
    
            <!-- Display if there are no records -->
    
        </div>
    </section>
    `
}

function createItemTemp(item) {
    return html`
<div class="listing">
    <div class="preview">
        <img src="${item.imageUrl}">
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>
   `
}
