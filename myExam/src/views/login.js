import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from '../api/data.js';
let context = null;

export function loginView(ctx) {
    context = ctx
    ctx.render(createRegisterTemp())
}
function createRegisterTemp() {
    return html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="#">Create an account</a>
                </p>
            </form>
        </div>
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