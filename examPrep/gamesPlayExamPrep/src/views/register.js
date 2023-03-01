import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from '../api/data.js';

let context = null;
export function registerView(ctx) {
  context = ctx
  ctx.render(createRegisterTemp())
}

function createRegisterTemp() {
  return html`
    <section id="register-page" class="content auth">
            <form @submit=${onRegister} id="register">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    `
}

async function onRegister(ev) {
  ev.preventDefault();
  debugger
  let formData = new FormData(ev.target);
  let email = formData.get('email');
  let pass = formData.get('password')
  let rePass = formData.get('confirm-password');
  if (!email || !pass || !rePass) {
    alert('All fields are required!')
  }
  else if (pass !== rePass) {
    alert('Passwords don\'t match!')
  }
  else {
    await register(email, pass)
    ev.target.reset()
    context.page.redirect('/home')
    context.updateNav()
  }
}