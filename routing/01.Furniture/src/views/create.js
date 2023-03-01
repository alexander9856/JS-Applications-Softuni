import { html } from "../../node_modules/lit-html/lit-html.js"
import { createFurniture } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onCreate}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control valid" id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control " id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>
    `
}

async function onCreate(ev) {
    debugger
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let make = formData.get('make')
    let price = formData.get('price')
    let model = formData.get('model')
    let img = formData.get('img')
    let year = formData.get('year')
    let material = formData.get('material')
    let description = formData.get('description')
    
    if (checkValid(make, price, model, img, year, material, description)) {
        await createFurniture({ make, price, model, img, year, material, description })
        context.page.redirect('/')
    }

}
export function checkValid(make, price, model, img, year, material, description) {
    let isvalid = false
    if (make.length < 4 || !make) {
        document.getElementById('new-make').classList.add('is-invalid')
        isvalid = false
    }
    else {
        document.getElementById('new-make').classList.add('is-valid')
        isvalid = true
    }
    if (model.length < 4 || !model) {
        document.getElementById('new-model').classList.add('is-invalid')
        isvalid = false

    }
    else {
        document.getElementById('new-model').classList.add('is-valid')
        isvalid = true

    }
    if (Number(year) < 1950 || Number(year) > 2050 || !year) {
        document.getElementById('new-year').classList.add('is-invalid')
        isvalid = false

    }
    else {
        document.getElementById('new-year').classList.add('is-valid')
        isvalid = true

    }
    if (description.length < 10 || !description) {
        document.getElementById('new-description').classList.add('is-invalid')
        isvalid = false

    }
    else {
        document.getElementById('new-description').classList.add('is-valid')
        isvalid = true

    }
    if (Number(price) < 0 || !price) {
        document.getElementById('new-price').classList.add('is-invalid')
        isvalid = false

    }
    else {
        document.getElementById('new-price').classList.add('is-valid')
        isvalid = true
    }
    if (!img) {
        document.getElementById('new-image').classList.add('is-invalid')
        isvalid = false
    }
    else{
        document.getElementById('new-image').classList.add('is-valid')
        isvalid = true
    }
    return isvalid
    
}
