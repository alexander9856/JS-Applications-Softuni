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


function catalogTemp(pet) {
    return html`
    <section id="editPage">
        <form @submit=${onEdit} class="editForm">
            <img src="/images/${pet.image}">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" value="${pet.name}">
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" value="${pet.breed}">
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" value="${pet.age}">
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" value="${pet.weight}">
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" value="${pet.image}">
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
    `

    async function onEdit(ev) {

        ev.preventDefault()
        let formData = new FormData(ev.target);
        let name = formData.get('name');
        let breed = formData.get('breed')
        let age = formData.get('age')
        let weight = formData.get('weight')
        let image = formData.get('image')
        let id = context.params.id
        if (name, breed,age, weight, image) {
            await updateAd(id, { name, breed,age, weight, image })
            context.page.redirect(`/details/${id}`)
        }
        else {
            alert('All fields are required!')
        }
    }

}

