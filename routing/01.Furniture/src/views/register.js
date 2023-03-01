import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from '../api/data.js';
let context = null;
export function registerView(ctx) {
    context = ctx
    ctx.render(createRegisterTemp())
}
function createRegisterTemp() {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onRegister}>
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
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>`
}

async function onRegister(ev) {
    ev.preventDefault()
    let formData = new FormData(ev.target);
    let email = formData.get('email');
    let pass = formData.get('password')
    let rePass = formData.get('rePass');
    if (!email || !pass || !rePass) {
        alert('All fields are required!')
    }
    else if (pass !== rePass) {
        alert('Passwords don\'t match!')
    }
    else {
        await register(email,pass)
        ev.target.reset()
        context.page.redirect('/')
        context.updateNav()
    }
}