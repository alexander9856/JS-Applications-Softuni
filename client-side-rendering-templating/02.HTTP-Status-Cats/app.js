import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';
let allCatsWrapper = document.getElementById('allCats');
let ul = document.createElement('ul');

function template(cat) {
    return html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
            <button @click=${showDetails} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                     <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
             </div>
    </li>`
}

render(cats.map(template), ul)
allCatsWrapper.appendChild(ul)

function showDetails(ev) {
    let details = ev.target.nextElementSibling;
    if (details.style.display == 'none') {
        ev.target.textContent = 'Hide status code'
        details.style.display = 'block'
    }
    else{
        details.style.display = 'none';
        ev.target.textContent = "Show status code" 
    }
}