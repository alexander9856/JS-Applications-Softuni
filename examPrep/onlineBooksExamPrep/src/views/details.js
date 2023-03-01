import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { like, getElementById, getLikes, getLikesFromCurrentUser } from '../api/data.js';
import { delPost } from '../api/data.js'

let context = null;
export async function detailsView(ctx) {
    debugger
    let user = JSON.parse(sessionStorage.getItem('user'))
    context = ctx
    let bookId = ctx.path.split('/').pop();
    let likesFromPerson = await getLikesFromCurrentUser(bookId)
    let item = await getElementById(bookId)
    let likes = await getLikes(bookId)
    
    ctx.render(createRegisterTemp(item,user,likes,likesFromPerson))
}

function createRegisterTemp(item, user,likes,likesFromPerson) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${item.title}</h3>
            <p class="type">Type: ${item.type}</p>
            <p class="img"><img src="/images/${itemImg}"></p>
            <div class="actions">
            ${user && user._id === item._ownerId ? 
            html`
                <a class="button" href="/edit/${item._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : ''}
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                <!-- <a class="button" href="#">Edit</a>
                <a class="button" href="#">Delete</a> -->
    
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${user && user._id !== item._ownerId  && likesFromPerson !== 1 ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : ""}

                
    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${item.description}</p>
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

    async function onLike(ev){
        debugger
        ev.preventDefault();
        let id = context.path.split('/').pop();;
        await like(id)
        ev.target.style.display = 'none'
        context.page.redirect(`/details/${id}`)
    }



}
