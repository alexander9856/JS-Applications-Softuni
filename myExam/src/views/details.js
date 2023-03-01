import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getElementById, getAllLikes, getLikesFromCurrentUser, like } from '../api/data.js';
import { delPost } from '../api/data.js'

let context = null;
export async function detailsView(ctx) {
    context = ctx
    let id = ctx.path.split('/').pop();
    let data = await getElementById(id)
    let allLikes = await getAllLikes(id);
    let likesFromUser = await getLikesFromCurrentUser(id)
    let user = JSON.parse(sessionStorage.getItem('user'))
    ctx.render(createRegisterTemp(data, user, allLikes, likesFromUser))
}

function createRegisterTemp(item, user, allLikes, likesFromUser) {
    return html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${item.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${allLikes}</span></div>
    
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${user && user._id !== item._ownerId  && likesFromUser === 0 ? html` <a @click=${onLike} href="javascript:void(0)"
                    id="like-btn">Like</a>` : ""}
                ${user && user._id == item._ownerId ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a><a
                    @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : ""}
            </div>
        </div>
    </section>
    `

    async function onDelete(ev) {
        ev.preventDefault()
        let id = context.path.split('/').pop();
        let isConfirmed = confirm('Are you sure?')
        if (isConfirmed) {
            await delPost(id)
            context.page.redirect('/dashboard')
        }
    }

    async function onLike(ev) {
        ev.preventDefault()
        let albumId = context.path.split('/').pop();
        await like({ albumId })
        context.page.redirect(`/details/${albumId}`)
    }


}
