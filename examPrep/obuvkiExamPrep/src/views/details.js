import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { delShoe } from '../api/data.js'


let context = null;
export async function detailsView(ctx) {
    context = ctx
    let id = ctx.path.split('/').pop();
    let data = await getElementById(id)
    let user = JSON.parse(sessionStorage.getItem('user'))
    debugger
    ctx.render(createRegisterTemp(data, user && user._id === data._ownerId))

}

function createRegisterTemp(item, user) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src="/images/${itemImg}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${item.brand}</span></p>
                <p>
                    Model: <span id="details-model">${item.model}</span>
                </p>
                <p>Release date: <span id="details-release">${item.release}</span></p>
                <p>Designer: <span id="details-designer">${item.designer}</span></p>
                <p>Value: <span id="details-value">${item.value}</span></p>
            </div>
            ${user ?
            html`
            <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
            </div>
            ` : ''
        }
        </div>
    </section>
    `

    async function onDelete(ev) {
        ev.preventDefault()
        debugger
        let id = context.path.split('/').pop();
        let isConfirmed = confirm('Are you sure?')
        if (isConfirmed) {
            await delShoe(id)
            context.page.redirect('/catalog')
        }
    }
}
