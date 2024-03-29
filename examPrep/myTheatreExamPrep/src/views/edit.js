import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { updateAd } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    debugger
    context = ctx
    let id = ctx.params.id
    let item = await getElementById(id)
    ctx.render(catalogTemp(item));

}


function catalogTemp(post) {
    return html`
    <section id="editPage">
        <form @submit=${onEdit} class="theater-form">
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="${post.title}">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${post.date}">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" value="${post.author}">
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description" placeholder="Description">${post.description}</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="${post.imageUrl}">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
    `

    async function onEdit(ev) {
        debugger
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let date = formData.get('date')
        let author = formData.get('author')
        let description = formData.get('description')
        let imageUrl = formData.get('imageUrl')
        let id = context.params.id
        if (title && date && author && description && imageUrl) {
            await updateAd(id, { title, date, author, description, imageUrl })
            context.page.redirect(`/details`)
        }
        else {
            alert('All fields are required!')
        }
    }

}

