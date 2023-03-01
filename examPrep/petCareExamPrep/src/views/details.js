import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { donate, getDonations, getElementById ,getDonationsFromCurrentUser} from '../api/data.js';
import { delPost } from '../api/data.js'


let context = null;


export async function detailsView(ctx) {
    context = ctx
    let id = context.path.split('/').pop();
    let data = await getElementById(id)
    let donations = await getDonations(id)
    let getFromCurrentUser = await getDonationsFromCurrentUser(id)
    let user = JSON.parse(sessionStorage.getItem('user'))
    ctx.render(createRegisterTemp(data,user,donations,getFromCurrentUser))
}

function createRegisterTemp(item,user,donations,getFromCurrentUser) {
    debugger
    let itemImg = item.image.split('/').pop()
    return html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${"/images/" + itemImg}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${item.name}</h1>
                <h3>Breed: ${item.breed}</h3>
                <h4>Age: ${item.age}</h4>
                <h4>Weight: ${item.weight}</h4>
                <h4 class="donation">Donation: ${donations * 100}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            <div class="actionBtn">
                <!-- Only for registered user and creator of the pets-->
                ${user && user._id === item._ownerId ?
                 html `
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                 ` : ""}
                
                <!--(Bonus Part) Only for no creator and user-->
                ${user && user._id !== item._ownerId && getFromCurrentUser == 0 ?
                html`<a @click=${onDonate} href="/details/${item._id}" class="donate">Donate</a>`:""}
                
            </div>
        </div>
    </div>
</section>
    `
}
async function onDelete(ev) {
    debugger
    ev.preventDefault()
    let id = context.path.split('/').pop();
    let isConfirmed = confirm('Are you sure?')
    if (isConfirmed) {
        await delPost(id)
        context.page.redirect('/dashboard')
    }
}

async function onDonate(ev) {
    ev.target.style.display = 'none'
    let petId = context.path.split('/').pop();
    await donate({ petId })
    context.page.redirect(`/details/${petId}`)
}



