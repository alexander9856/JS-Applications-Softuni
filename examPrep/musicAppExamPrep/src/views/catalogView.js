import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
// import { getElementById } from '../api/data.js'
let page = null;

export async function catalogView(ctx) {
    debugger
    page = ctx.page
    let data = await getAllItems()
    let user = JSON.parse(sessionStorage.getItem('user'))

    ctx.render(catalogTemp(data, user))
}

function catalogTemp(data, user) {
    return html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        ${data.length > 0 ? html`${data.map(x => createItemTemp(x, user))}` : html` <p>No Albums in Catalog!</p>`}
        <!--No albums in catalog-->
    
    </section>
    `
}

function createItemTemp(item, user) {
    return html`
<div class="card-box">
    <img src="${item.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${user ? html`<div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>` : ""}

    </div>
</div>
   `
}
