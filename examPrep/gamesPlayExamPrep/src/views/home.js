import { html } from "../../node_modules/lit-html/lit-html.js"
import { getLatestGames } from '../api/data.js'

let context = null
export async function homeView(ctx) {
    context = ctx
    let latestGames = await getLatestGames()
    ctx.render(catalogTemp(latestGames))
}

function catalogTemp(latestGames) {
    return html`
    <section id="welcome-world">
    
        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">
    
        <div id="home-page">
            <h1>Latest Games</h1>
            ${latestGames.length > 0 ? 
                html`${latestGames.map(x => gameTemp(x))}` 
                : html` <p class="no-articles">No games
                yet</p>
            `}
            <!-- Display div: with information about every game (if any) -->
    
    
            <!-- Display paragraph: If there is no games  -->
        </div>
    </section>
    `
}

function gameTemp(item) {
    let itemImg = item.imageUrl.split('/').pop()
    return html`
        <div class="game">
            <div class="image-wrap">
                <img src="${"/images/" + itemImg}">
            </div>
            <h3>${item.title}</h3>
            <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div class="data-buttons">
                <a href="/details/${item._id}" class="btn details-btn">Details</a>
            </div>
        `
}

