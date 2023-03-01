import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { getElementById } from '../api/data.js';
import { delAd } from '../api/data.js'
import {apply} from '../api/data.js'
import {getApplications} from '../api/data.js'

let context = null;
export async function detailsView(ctx) {
    context = ctx
    let id = ctx.path.split('/').pop();
    let data = await getElementById(id)
    let user = JSON.parse(sessionStorage.getItem('user'))
    let applicationsCount = await getApplications(id)
    debugger
    ctx.render(createRegisterTemp(data, user,applicationsCount))
}

function createRegisterTemp(item, user,applicationsCount) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${"/images/" + itemImg}" alt="example1" />
            <p id="details-title">${item.title}</p>
            <p id="details-category">
                Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${item.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${item.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${item.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${applicationsCount}</strong></p>
    
            <div id="action-buttons">
                ${user && user._id === item._ownerId ?
                 html `
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="/catalog" id="delete-btn">Delete</a>`
                 : ''}
                <!--Bonus - Only for logged-in users ( not authors )-->
                ${user && user._id !== item._ownerId && applicationsCount !== 1 ? html `<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` : ''}
            </div>
            <!--Edit and Delete are only for creator-->
    
        </div>
    </section>
    `

    async function onDelete(ev) {
        debugger
        ev.preventDefault()
        let id = context.path.split('/').pop();
        let isConfirmed = confirm('Are you sure?')
        if (isConfirmed) {
            await delAd(id)
            context.page.redirect('/catalog')
        }
    }

    async function onApply(ev){
        ev.preventDefault()
        let offerId = context.params.id
        ev.target.style.display ='none'
        await apply({offerId})
        
        context.page.redirect('/details/' + offerId)
    }
}
