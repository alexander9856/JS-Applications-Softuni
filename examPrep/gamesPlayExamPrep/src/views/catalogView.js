import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
let page = null;

export async function catalogView(ctx) {
    page = ctx.page
    let data = await getAllItems();
    ctx.render(template(data))
}


function template(data) {

    return html`
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        ${data.length > 0 ? 
        html`${data.map(x => templatePost(x))}`
        : html`<h3 class="no-articles">No articles yet</h3>`
        }
        <!-- Display paragraph: If there is no games  -->
        
    </section>
    `
}

function templatePost(item) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${"/images/" + itemImg}">
            <h6>${item.category}</h6>
            <h2>${item.title}</h2>
            <a href="/details/${item._id}" class="details-button">Details</a>
        </div>
    </div>
    `
}