import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPost } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
    <section id="create">
        <div class="form">
            <h2>Add Album</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
                <input type="text" name="album" id="album-album" placeholder="Album" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
                <input type="text" name="release" id="album-release" placeholder="Release date" />
                <input type="text" name="label" id="album-label" placeholder="Label" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
    `
}

async function onCreate(ev) {

    ev.preventDefault();
    let formData = new FormData(ev.target);
    let singer = formData.get('singer');
    let album = formData.get('album')
    let imageUrl = formData.get('imageUrl')
    let release = formData.get('release')
    let label = formData.get('label')
    let sales = formData.get('sales')

    if (singer && album && imageUrl && release && label && sales) {
        await createPost({ singer, album, imageUrl, release, label, sales })
        context.page.redirect('/dashboard')
        ev.target.reset()
    }
    else {
        alert('All fields are required!')
    }
}
