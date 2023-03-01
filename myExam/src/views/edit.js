import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { updateAd } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    context = ctx
    let id = ctx.params.id
    let item = await getElementById(id)
    ctx.render(catalogTemp(item))
}


function catalogTemp(item) {
    return html`
    <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form @submit=${onEdit} class="edit-form">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${item.singer} />
                <input type="text" name="album" id="album-album" placeholder="Album" .value=${item.album} />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${item.imageUrl} />
                <input type="text" name="release" id="album-release" placeholder="Release date" .value=${item.release} />
                <input type="text" name="label" id="album-label" placeholder="Label" .value=${item.label} />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${item.sales} />
                <button type="submit">post</button>
            </form>
        </div>
    </section>
    `

    async function onEdit(ev) {
        debugger
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let singer = formData.get('singer');
        let album = formData.get('album')
        let imageUrl = formData.get('imageUrl')
        let release = formData.get('release')
        let label = formData.get('label')
        let sales = formData.get('sales')
        let id = context.params.id
        if (singer && album && imageUrl && release && label && sales) {
            await updateAd(id, { singer, album, imageUrl, release, label, sales })
            context.page.redirect(`/details/${id}`)
        }
        else {
            alert('All fields are required!')
        }
    }

}

