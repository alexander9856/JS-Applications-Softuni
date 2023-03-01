import { html } from "../../node_modules/lit-html/lit-html.js";
import { getByQuery, getElementById } from '../api/data.js'

let context = null

export async function searchView(ctx) {
    debugger
    context = ctx;
    let query = ctx.querystring.split('=').pop();
    let data = query ? await getByQuery(query) : []

    ctx.render(searchTemplate(data));
}

function searchTemplate(data) {
    return html`
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
        <div class="listings">
            ${data ? html`${data.map(itemTemplate)}` : html` <p class="no-cars"> No results.</p>`}
            <!-- Display all records -->
    
            <!-- Display if there are no matches -->
        </div>
    </section>
    `
}
function itemTemplate(item) {
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
function onSearch(ev) {
    debugger
    ev.preventDefault()
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        context.page.redirect(`/search?query=${query}`);
    }


}