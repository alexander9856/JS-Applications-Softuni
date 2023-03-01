import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPair } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
    <section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit = ${onCreate} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `
}

async function onCreate(ev) {
    debugger
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let brand = formData.get('brand');
    let model = formData.get('model')
    let imageUrl = formData.get('imageUrl')
    let release = formData.get('release')
    let designer = formData.get('designer')
    let value = formData.get('value')
    if (brand, model,imageUrl, release, designer, value) {
        await createPair({brand, model,imageUrl, release, designer, value})
        context.page.redirect('/catalog')
        ev.target.reset()
    }
    else{
        alert('All fields are required!')
    }
}
