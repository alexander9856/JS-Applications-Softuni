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
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src="${item.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${item.brand}</li>
                <li><span>Model:</span>${item.model}</li>
                <li><span>Year:</span>${item.year}</li>
                <li><span>Price:</span>${item.price}$</li>
            </ul>
    
            <p class="description-para">Some description of this car. ${item.description}</p>
            ${user && user._id == item._ownerId ? html`<div class="listings-buttons">
                <a href="/edit/${item._id}" class="button-list">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
            </div>` : ""}
    
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
