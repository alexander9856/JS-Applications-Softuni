import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from '../api/data.js';

let context = null;
export function registerView(ctx) {
  context = ctx
  ctx.render(createRegisterTemp())
}

function createRegisterTemp() {
  return html`
    <section id="registerPage">
            <form @submit=${onRegister} class="registerForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="#">here</a></span>
                </p>
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
  let rePass = formData.get('repeatPassword');
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