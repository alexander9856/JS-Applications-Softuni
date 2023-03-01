import { html } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { updateGame } from '../api/data.js'

let context = null;

export async function editView(ctx) {
    context = ctx
    let id = ctx.params.id
    let game = await getElementById(id)
    ctx.render(catalogTemp(game))
}


function catalogTemp(game) {
    return html`
    <section id="edit-page" class="auth">
        <form @submit=${onEdit} id="edit">
            <div class="container">
    
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value="${game.title}">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value="${game.category}">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${game.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">
    
            </div>
        </form>
    </section>
    `

    async function onEdit(ev) {
        ev.preventDefault()
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let category = formData.get('category')
        let maxLevel = formData.get('maxLevel')
        let imageUrl = formData.get('imageUrl')
        let summary = formData.get('summary')
        let id = context.params.id
        if (title, category, maxLevel, imageUrl, summary) {
            await updateGame(id, { title, category, maxLevel, imageUrl, summary })
            context.page.redirect(`/details/${id}`)
        }
        else {
            alert('All fields are required!')
        }
    }

}

