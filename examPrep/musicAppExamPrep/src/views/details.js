import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { delItem } from '../api/data.js'


let context = null;
export async function detailsView(ctx) {
    context = ctx
    let id = ctx.path.split('/').pop();
    let data = await getElementById(id)
    let user = JSON.parse(sessionStorage.getItem('user'))
    ctx.render(createRegisterTemp(data, user))

}

function createRegisterTemp(item, user) {
    return html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src="${item.imgUrl}">
            </div>
            <div class="albumInfo">
                <div class="albumText">
                    <h1>Name: ${item.name}</h1>
                    <h3>Artist: ${item.artist}</h3>
                    <h4>Genre: ${item.genre}</h4>
                    <h4>Price: $${item.price}</h4>
                    <h4>Date: ${item.date}</h4>
                    <p>Description: ${item.description}</p>
                </div>
    
                <!-- Only for registered user and creator of the album-->
                ${user && user._id == item._ownerId ?
                 html`
                 <div class="actionBtn">
                    <a href="/edit/${item._id}" class="edit">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                </div>
                 ` : ""}
                
            </div>
        </div>
    </section>
    `

    async function onDelete(ev) {
        ev.preventDefault()
        debugger
        let id = context.path.split('/').pop();
        let isConfirmed = confirm('Are you sure?')
        if (isConfirmed) {
            await delItem(id)
            context.page.redirect('/catalog')
        }
    }
}
