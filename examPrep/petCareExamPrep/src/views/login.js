import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from '../api/data.js';
let context = null;

export function loginView(ctx){
    context = ctx
    ctx.render(createRegisterTemp())
}
function createRegisterTemp() {
    return html`
    <section id="loginPage">
            <form @submit=${onLogin} class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </form>
        </section>
    `
}

async function onLogin(ev) {
    ev.preventDefault()
    debugger
    let formData = new FormData(ev.target);
    let email = formData.get('email');
    let pass = formData.get('password')
    if (!email || !pass) {
        alert('All fields are required!')
    }
    else {
        await login(email, pass)
        ev.target.reset()
        context.page.redirect('/home')
        context.updateNav()
    }
}