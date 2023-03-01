import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from '../api/data.js';
let context = null;

export function loginView(ctx) {
    context = ctx
    ctx.render(createRegisterTemp())
}
function createRegisterTemp() {
    return html`
    <section id="login-page" class="login">
        <form @submit=${onLogin} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
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
        context.page.redirect('/dashboard')
        context.updateNav()
    }
}