import { html, nothing } from "../../node_modules/lit-html/lit-html.js"
import { myOwnFurniture } from '../api/data.js'
let context = null
export async function furnitureView(ctx) {
    context = ctx;

    let data = await myOwnFurniture()
    debugger
    ctx.render(data.map(createRegisterTemp))

}

function createRegisterTemp(item) {
    let itemImg = item.img.split('/').pop()
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${"/images/" + itemImg}" />
                    <p>${item.description}</p>
                    <footer>
                        <p>Price: <span>${item.price} $</span></p>
                    </footer>
                    <div>
                        <a href="/details/${item._id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}