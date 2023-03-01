import { html, nothing } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { checkValid } from './create.js'
import { updateFurniture } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    context = ctx
    let id = ctx.params.id
    let item = await getElementById(id)
    ctx.render(catalogTemp(item))
}


function catalogTemp(data) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onEdit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value="${data.make}">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model" value="${data.model}">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control" id="new-year" type="number" name="year" value="${data.year}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                        value="${data.description}">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value="${data.price}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value="${data.img}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" value="${data.material}">
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
    `

    async function onEdit(ev) {
        ev.preventDefault()
        debugger
        let formData = new FormData(ev.target);
        let make = formData.get('make')
        let price = formData.get('price')
        let model = formData.get('model')
        let img = formData.get('img')
        let year = formData.get('year')
        let material = formData.get('material')
        let description = formData.get('description');
        let id = context.params.id
        if (checkValid(make, price, model, img, year, material, description)) {
            await updateFurniture(id, { make, price, model, img, year, material, description })
            context.page.redirect('/')
        }
    }
}