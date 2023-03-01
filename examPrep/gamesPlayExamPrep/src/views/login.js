import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from '../api/data.js';
let context = null;

export function loginView(ctx){
    context = ctx
    ctx.render(createRegisterTemp())
}
function createRegisterTemp() {
    return html`
    <section id="login-page" class="auth">
            <form @submit=${onLogin} id="login">

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
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