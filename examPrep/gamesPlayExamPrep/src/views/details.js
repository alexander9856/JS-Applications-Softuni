import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getElementById, createComment, getAllComents } from '../api/data.js';
import { delPost } from '../api/data.js'


let context = null;


export async function detailsView(ctx) {
    context = ctx
    let id = context.path.split('/').pop();
    let data = await getElementById(id)
    debugger
    let user = JSON.parse(sessionStorage.getItem('user'))
    let allComments = await getAllComents(id)
    ctx.render(createRegisterTemp(data, user, allComments))
}

function createRegisterTemp(item, user, allComments) {
    debugger
    let itemImg = item.imageUrl.split('/').pop()
    return html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">
        
                <div class="game-header">
                    <img class="game-img" src="${"/images/" + itemImg}" />
                    <h1>${item.title}</h1>
                    <span class="levels">MaxLevel: ${item.maxLevel}</span>
                    <p class="type">${item.category}</p>
                </div>
        
                <p class="text">
                    ${item.summary}
                </p>
        
                <!-- Bonus ( for Guests and Users ) -->
        
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        ${allComments.length > 0 ? 
                        html`${allComments.map(x => commentTemplate(x))}`
                        : html`<p class="no-comment">No comments.</p>`}
                        <!-- list all comments for current game (If any) -->
        
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                </div>
                ${user && user._id == item._ownerId ? html`
                <div class="buttons">
                    <a href="/edit/${item._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>` : ''}
                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        
            </div>
        
            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${user && user._id !== item._ownerId ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${postComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>` : ''}
        
        
        </section>
    `
}

function commentTemplate(comment) {
    return html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
    `
}
async function onDelete(ev) {
    debugger
    ev.preventDefault()
    let id = context.path.split('/').pop();
    let isConfirmed = confirm('Are you sure?')
    if (isConfirmed) {
        await delPost(id)
        context.page.redirect('/home')
    }
}

async function postComment(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let comment = formData.get('comment');
    let id = context.params.id

    await createComment(id, comment)
    context.page.redirect(`/details/${id}`)
    ev.target.reset()
}




