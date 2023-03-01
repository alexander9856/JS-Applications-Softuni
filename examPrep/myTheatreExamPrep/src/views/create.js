import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPost } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
        <section id="createPage">
            <form @submit=${onCreate} class="create-form">
                <h1>Create Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author">
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
    `
}

async function onCreate(ev) {
    debugger
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let title = formData.get('title');
    let date = formData.get('date')
    let author = formData.get('author')
    let description = formData.get('description')
    let imageUrl = formData.get('imageUrl')
    if (title && date && author && description && imageUrl) {
        await createPost({ title, date, author, description, imageUrl })
        context.page.redirect('/home')
        ev.target.reset()
    }
    else {
        alert('All fields are required!')
    }
}
