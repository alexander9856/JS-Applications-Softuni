import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from '../api/data.js';
let page = null;

export async function catalogView(ctx) {
    debugger
    page = ctx.page
    console.log('haha')
    let data = await getAllItems();
    ctx.render(template(data))
}


function template(data) {

    return html`
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                ${data.length > 0 ?
                 html`${data.map(x => templatePost(x))}`
                :html `
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`}
                <!--If there is no pets in dashboard-->
                
            </div>
        </section>
    `
}

function templatePost(item) {
    let itemImg = item.image.split('/').pop()
    return html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${"/images/" + itemImg}">
        </article>
        <h2 class="name">${item.name}</h2>
        <h3 class="breed">${item.breed}</h3>
        <div class="action">
            <a class="btn" href="/details/${item._id}">Details</a>
        </div>
    </div>
    `
}