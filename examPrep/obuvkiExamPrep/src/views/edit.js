import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { updateShoe } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    context = ctx
    let id = ctx.params.id
    let item = await getElementById(id)
    ctx.render(catalogTemp(item))
}


function catalogTemp(shoe) {
    return html`
    <section id="edit">
        <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onEdit} class="edit-form">
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${shoe.brand} />
                <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${shoe.model} />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${shoe.imageUrl} />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${shoe.release} />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${shoe.designer} />
                <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${shoe.value} />

                <button type="submit">post</button>
            </form>
        </div>
    </section>
    `

    async function onEdit(ev) {
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let brand = formData.get('brand')
        let model = formData.get('model')
        let imageUrl = formData.get('imageUrl')
        let release = formData.get('release')
        let designer = formData.get('designer')
        let value = formData.get('value')
        let id = context.params.id;

        if (brand, model,imageUrl, release, designer, value) {
            await updateShoe(id, { brand, model,imageUrl, release, designer, value})
            context.page.redirect('/catalog')
        }
        else{
            alert('All fields are required!')
        }
    }

}

