import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPet } from '../api/data.js'
let context = null;

export function createView(ctx) {
    context = ctx
    ctx.render(catalogTemp())
}

function catalogTemp() {
    return html`
    <section id="createPage">
            <form @submit=${onCreate} class="createForm">
                <img src="./images/cat-create.jpg">
                <div>
                    <h2>Create PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" placeholder="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" placeholder="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" placeholder="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Create Pet</button>
                </div>
            </form>
        </section>
    `
}

async function onCreate(ev) {
  
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let name = formData.get('name');
    let breed = formData.get('breed')
    let age = formData.get('age')
    let weight = formData.get('weight')
    let image = formData.get('image')
    if (name, breed,age, weight, image) {
        await createPet({name, breed,age, weight, image})
        context.page.redirect('/dashboard')
        ev.target.reset()
    }
    else{
        alert('All fields are required!')
    }
}
