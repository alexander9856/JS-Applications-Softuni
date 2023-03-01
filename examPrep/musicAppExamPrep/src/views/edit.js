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
    <section class="editPage">
        <form @submit=${onEdit}>
            <fieldset>
                <legend>Edit Album</legend>
    
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" value="${item.name}">
    
                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${item.imgUrl}">
    
                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" value="${item.price}">
    
                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${item.releaseDate}">
    
                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" value="${item.artist}">
    
                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" value="${item.genre}">
    
                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10"
                        cols="10">${item.description}</textarea>
    
                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>
    `

    async function onEdit(ev) {
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let name = formData.get('name');
        let imgUrl = formData.get('imgUrl')
        let price = formData.get('price')
        let releaseDate = formData.get('releaseDate')
        let artist = formData.get('artist')
        let genre = formData.get('genre')
        let description = formData.get('description')
        let id = context.params.id;

        if (name && imgUrl && price && releaseDate && artist && genre && description) {
            await updateItem(id, { name, imgUrl, price, releaseDate, artist, genre, description })
            context.page.redirect('/details')
        }
        else {
            alert('All fields are required!')
        }
    }

}

