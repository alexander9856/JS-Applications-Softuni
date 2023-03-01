import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { updateItem } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    context = ctx
    let id = ctx.params.id
    let item = await getElementById(id)
    ctx.render(catalogTemp(item))
}


function catalogTemp(item) {
    return html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${onEdit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value="${item.brand}">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value="${item.model}">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value="${item.description}">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value="${item.year}">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${item.imageUrl}">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value="${item.price}">
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
    `

    async function onEdit(ev) {
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let brand = formData.get('brand');
        let model = formData.get('model')
        let description = formData.get('description')
        let year = Number(formData.get('year'))
        let imageUrl = formData.get('imageUrl')
        let price = Number(formData.get('price'))
        let id = context.params.id;

        if (brand && model && description && year && imageUrl && price && Number(year) >= 0 && Number(price) >= 0) {
            await updateItem(id, { brand, model, description, year, imageUrl, price })
            context.page.redirect('/details/' + id)
        }
        else {
            alert('All fields are required!')
        }
    }

}

