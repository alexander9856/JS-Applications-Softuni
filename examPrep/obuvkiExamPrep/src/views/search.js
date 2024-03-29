import { html } from "../../node_modules/lit-html/lit-html.js";
import { getModel } from '../api/data.js'

let context = null

export async function searchView(ctx) {
    debugger
    context = ctx;
    let query = ctx.querystring.split('=').pop();
    let data = [];
    let user = JSON.parse(sessionStorage.getItem('user'));
    let userId = user && user._id
    if (query) {
        data = await getModel(query)
    }

    ctx.render(searchTemplate(data, userId));
}

function searchTemplate(data, userId) {
    return html`
    <section id="search">
        <h2>Search by Brand</h2>
    
        <form @submit=${onSearch} class="search-wrapper cf">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button type="submit">Search</button>
        </form>
    
        <h3>Results:</h3>
        <div id="search-container">
            <ul class="card-wrapper">
                ${data.length > 0 ? data.map(x => shoeTemplate(x, userId)) : html`<h2>There are no results found.</h2>`}
            </ul>
        </div>
    
    </section>
    `
}
function shoeTemplate(shoe, userId) {
        return html`
        <!-- Display a li with information about every post (if any)-->
        <li class="card">
            <img src="${shoe.imageUrl}" alt="travis" />
            <p>
                <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
            </p>
            <p>
                <strong>Model: </strong><span class="model">${shoe.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
            ${userId ?
             html`<a class="details-btn" href="/details/${shoe._id}">Details</a>`
            : ""
            }
        </li>
`
    }
function onSearch(ev) {
    debugger
    ev.preventDefault()
    const formData = new FormData(ev.target);

    const query = formData.get('search').trim();

    context.page.redirect(`/search?query=${query}`);

}