import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { updateAd } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    debugger
    context = ctx
    let id = ctx.params.id
    let item = await getElementById(id)
    // let options = {
    //     'Fiction': `<option value="Fiction">Fiction</option>`,
    //     'Romance': `<option value="Romance">Romance</option>`,
    //     'Mistery': `<option value="Mistery">Mistery</option>`,
    //     'Classic': `<option value="Classic">Classic</option>`,
    //     'other': `<option value="other">other</option>`
    // }
    ctx.render(catalogTemp(item));

}


function catalogTemp(post) {
    return html`
    <section id="edit-page" class="edit">
        <form @submit=${onEdit} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value="${post.title}">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${post.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value="${post.imageUrl}">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value="${post.type}">
                            <option value="${post.type}" selected>${post.type}</option>

                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
    `
    function optionTemplate(option) {
        return html`
        <option value="${option}">${option}</option>
        `
    }
    async function onEdit(ev) {
        debugger
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description')
        let imageUrl = formData.get('imageUrl')
        let type = formData.get('type')
        let id = context.params.id
        if (title && description && imageUrl && type) {
            await updateAd(id, { title, description, imageUrl, type })
            context.page.redirect(`/details/${id}`)
        }
        else {
            alert('All fields are required!')
        }
    }

}

