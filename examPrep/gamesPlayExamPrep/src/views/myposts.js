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
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    <div class="my-posts">
        ${data.length > 0 ? html`${data.map(templatePost)}` 
        : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
    </div>

    <!-- Display an h1 if there are no posts -->

</section>
    `
}

function templatePost(item) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src="${"/images/" + itemImg}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>
    `
}