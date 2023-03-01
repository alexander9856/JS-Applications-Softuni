import { html } from "../../node_modules/lit-html/lit-html.js";
import { getModel, getByQuery } from '../api/data.js'

let context = null

export async function searchView(ctx) {
    debugger
    context = ctx;
    let query = ctx.querystring.split('=').pop();
    let data = await getByQuery(query);
    let user = JSON.parse(sessionStorage.getItem('user'));
    ctx.render(searchTemplate(data !== undefined ? data : "", user));
}

function searchTemplate(data, user) {
    return html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            ${data.length > 0 ? html`${data.map(x => itemTemplate(x, user))}` : html` <p class="no-result">No result.</p>`}
    
            <!--If there are no matches-->
        </div>
    </section>
    `
}
function itemTemplate(item, user) {
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
function onSearch(ev) {
    debugger
    ev.preventDefault()
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        context.page.redirect(`/search?query=${query}`);

    }


}