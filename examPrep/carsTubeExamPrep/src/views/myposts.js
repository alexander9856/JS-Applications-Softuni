import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyListings } from "../api/data.js";
let context = null
export async function myposts(ctx) {
    context = ctx
    let myListing = await getMyListings();
    ctx.render(listingsTemplate(myListing))
}


function listingsTemplate(data) {
    return html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
    
            <!-- Display all records -->
            ${data.length > 0 ? html`${data.map(listingTemplate)}` : html` <p class="no-cars"> You haven't listed any cars
                yet.</p>`}
    
    
            <!-- Display if there are no records -->
        </div>
    </section>
    `
}

function listingTemplate(item) {
    return html`
    <div class="listing">
        <div class="preview">
            <img src="${item.imgUrl}">
        </div>
        <h2>${item.brand} ${item.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${item.year}</h3>
                <h3>Price: ${item.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${item._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
    `
}

