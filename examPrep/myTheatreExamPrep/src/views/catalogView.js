import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
let page = null;

export async function catalogView(ctx) {
    debugger
    page = ctx.page
    console.log('haha')
    let data = await getAllItems();
    let user = JSON.parse(sessionStorage.getItem('user'))
    ctx.render(template(data))
}


function template(data) {
    return html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    <ul class="other-books-list">
        ${data.length > 0 ? html`${data.map(templatePost)}` : html`<p class="no-books">No books in database!</p>`}
    </ul>
    <!-- Display paragraph: If there are no books in the database -->

</section>
`
}

function templatePost(item) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src="${"/images/" + itemImg}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
    `
}