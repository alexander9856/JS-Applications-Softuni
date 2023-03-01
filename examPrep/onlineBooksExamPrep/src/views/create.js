import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPost } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
    <section id="create-page" class="create">
        <form @submit=${onCreate} id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>
    `
}

async function onCreate(ev) {
    debugger
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let title = formData.get('title');
    let description = formData.get('description')
    let imageUrl = formData.get('imageUrl')
    let type = formData.get('type')
    if (title && description && imageUrl && type) {
        await createPost({ title, description, imageUrl, type })
        context.page.redirect('/dashboard')
        ev.target.reset()
    }
    else {
        alert('All fields are required!')
    }
}
