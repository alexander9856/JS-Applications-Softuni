import { html } from "../../node_modules/lit-html/lit-html.js"
import { createGame } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
    <section id="create-page" class="auth">
        <form @submit=${onCreate} id="create">
            <div class="container">
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
    `
}

async function onCreate(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let title = formData.get('title');
    let category = formData.get('category')
    let maxLevel = formData.get('maxLevel')
    let imageUrl = formData.get('imageUrl')
    let summary = formData.get('summary')
    if (title, category, maxLevel, imageUrl, summary) {
        await createGame({ title, category, maxLevel, imageUrl, summary })
        context.page.redirect('/home')
        ev.target.reset()
    }
    else {
        alert('All fields are required!')
    }
}
