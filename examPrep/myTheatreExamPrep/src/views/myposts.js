import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems, getMyPosts } from '../api/data.js';
let page = null;

export async function myPostsView(ctx) {
    page = ctx.page
    let user = JSON.parse(sessionStorage.getItem('user'))
    let data = await getMyPosts();
    ctx.render(template(data, user))
}


function template(data, user) {

    return html`
            <section id="profilePage">
                <div class="userInfo">
                    <div class="avatar">
                        <img src="./images/profilePic.png">
                    </div>
                    <h2>${user.email}</h2>
                </div>
                <div class="board">
                    <!--If there are event-->
                    ${data.length > 0 ? html`${data.map(templatePost)}` : 
                    html`<div class="no-events">
                        <p>This user has no events yet!</p>
                    </div>`}
                    <!--If there are no event-->
                  
                </div>
            </section>
    `
}

function templatePost(item) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
    <div class="eventBoard">
        <div class="event-info">
            <img src="/images/${itemImg}">
            <h2>${item.title}</h2>
            <h6>${item.date}</h6>
            <a href="/details/${item._id}" class="details-button">Details</a>
        </div>
    </div>
    `
}