import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
let page = null;

export async function catalogView(ctx) {
    debugger
    page = ctx.page
    let data = await getAllItems();
    ctx.render(template(data))
}
function template(data) {

    return html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        ${data.length > 0 ? html`${data.map(templatePost)}` : html`<h2>There are no albums added yet.</h2>`}
        <!-- Display a li with information about every post (if any)-->
</section>
    `
}

function templatePost(item) {
    return html`
<li class="card">
    <img src="${item.imageUrl}" alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${item.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</li>
    `
}