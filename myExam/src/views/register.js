import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from '../api/data.js';

let context = null;
export function registerView(ctx) {
  context = ctx
  ctx.render(createRegisterTemp())
}

function createRegisterTemp() {
  return html`
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="login-form">
          <input type="text" name="email" id="register-email" placeholder="email" />
          <input type="password" name="password" id="register-password" placeholder="password" />
          <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
          <button type="submit">register</button>
          <p class="message">Already registered? <a href="#">Login</a></p>
        </form>
      </div>
    </section>
    `
}

async function onRegister(ev) {
  ev.preventDefault();
  debugger
  let formData = new FormData(ev.target);
  let email = formData.get('email');
  let pass = formData.get('password')
  let rePass = formData.get('re-password');
  if (!email || !pass || !rePass) {
    alert('All fields are required!')
  }
  else if (pass !== rePass) {
    alert('Passwords don\'t match!')
  }
  else {
    await register(email, pass)
    ev.target.reset()
    context.page.redirect('/dashboard')
    context.updateNav()
  }
}