import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from '../api/data.js';

let context = null;
export function loginView(ctx) {
    context = ctx
    ctx.render(createRegisterTemp())
}

function createRegisterTemp() {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onLogin}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>`
}

async function onLogin(ev) {
    ev.preventDefault()
    let formData = new FormData(ev.target);
    let email = formData.get('email');
    let pass = formData.get('password')
    if (!email || !pass) {
        alert('All fields are required!')
    }
    else {
        await login(email, pass)
        ev.target.reset()
        context.page.redirect('/')
        context.updateNav()

    }
}