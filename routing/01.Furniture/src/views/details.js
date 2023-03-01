import { html, nothing } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import {delFurniture} from '../api/data.js'


let context = null;
export async function detailsView(ctx) {
    debugger
    context = ctx
    let id = ctx.path.split('/').pop();
    let data = await getElementById(id)
    let user = JSON.parse(sessionStorage.getItem('user'))
    ctx.render(createRegisterTemp(data,user && user._id === data._ownerId))

}

function createRegisterTemp(item,user) {
    debugger
    let itemImg = item.img.split('/').pop()
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${"/images/" + itemImg}" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            ${user ? 
            html`
            <div>
                <a href='/edit/${item._id}' class="btn btn-info">Edit</a>
                <a id=${item._id} @click=${onDelete} href='/' class="btn btn-red">Delete</a>
            </div>`
            : ''
            }  
        </div>
    </div>
    `

   async  function onDelete(ev){
        let id = ev.target.id;
        debugger
        await delFurniture(id)
    }
}