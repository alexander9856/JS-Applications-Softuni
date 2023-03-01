import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems, getMyPosts } from '../api/data.js';
let page = null;

export async function myPostsView(ctx) {
    page = ctx.page
    let data = await getMyPosts();
    ctx.render(template(data))
}


function template(data) {

    return html`
                <section id="my-books-page" class="my-books">
                    <h1>My Books</h1>
                    <!-- Display ul: with list-items for every user's books (if any) -->
                    <ul class="my-books-list">
                        ${data.length > 0 ? html`${data.map(templatePost)}` 
                        : html` <p class="no-books">No books in database!</p>
                        `}
                    </ul>
                
                    <!-- Display paragraph: If the user doesn't have his own books  -->
                </section>
    `
}

function templatePost(item) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
     <li class="otherBooks">
         <h3>${item.title}</h3>
         <p>Type: ${item.type}</p>
         <p class="img"><img src="./images/${itemImg}"></p>
         <a class="button" href="/details/${item._id}">Details</a>
    </li>
    `
}