import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { like, getElementById, getLikes, getLikesFromCurrentUser } from '../api/data.js';
import { delPost } from '../api/data.js'

let context = null;
export async function detailsView(ctx) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    context = ctx
    let filmId = ctx.path.split('/').pop();
    let allLikes = await getLikes(filmId)
    let likesFromUser = await getLikesFromCurrentUser(filmId)
    let film = await getElementById(filmId)


    ctx.render(createRegisterTemp(film, user, allLikes, likesFromUser))
}

function createRegisterTemp(item, user, allLikes, likesFromUser) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${item.title}</h1>
                <div>
                    <img src="/images/${itemImg}" />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${item.description}</p>
                <h4>Date: ${item.date}</h4>
                <h4>Author: ${item.author}</h4>
                <div class="buttons">
                    ${user && user._id == item._ownerId ? html`<a @click=${onDelete} class="btn-delete"
                        href="javascript:void(0)">Delete</a>
                    <a class="btn-edit" href="/edit/${item._id}">Edit</a>` : ""}
    
                    ${user && user._id !== item._ownerId && likesFromUser == 0 ? html`<a @click=${onLike} class="btn-like"
                        href="javascript:void(0)">Like</a>` :
            ""}
    
                </div>
                <p id="likeText" class="likes">Likes: ${allLikes}</p>
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
            context.page.redirect('/profile')
        }
    }

    async function onLike(ev) {
        ev.preventDefault();
        ev.target.style.display = 'none'
        // let number = Number(document.getElementById('likeText').textContent.split(': ').pop())
        // document.getElementById('likeText').textContent = `Likes: ${number + 1}`
        let theaterId = context.path.split('/').pop();
        await like(theaterId)
        // let allLikes = await getLikes(theaterId);
        debugger

        context.page.redirect(`/details/${theaterId}`)
    }



}
