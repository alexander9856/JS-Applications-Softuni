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
  <div class="container">
    <form @submit=${onRegister} id="register-form">
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr>
      <p>Username</p>
      <input type="text" placeholder="Enter Username" name="username" required>

      <p>Password</p>
      <input type="password" placeholder="Enter Password" name="password" required>

      <p>Repeat Password</p>
      <input type="password" placeholder="Repeat Password" name="repeatPass" required>
      <hr>

      <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
      <p>Already have an account?
        <a href="#">Sign in</a>.
      </p>
    </div>
  </div>
</section>
    `
}

async function onRegister(ev) {
  ev.preventDefault();
  debugger
  let formData = new FormData(ev.target);
  let username = formData.get('username');
  let pass = formData.get('password')
  let rePass = formData.get('repeatPass');
  if (!username || !pass || !rePass) {
    alert('All fields are required!')
  }
  else if (pass !== rePass) {
    alert('Passwords don\'t match!')
  }
  else {
    await register(username, pass)
    ev.target.reset()
    context.page.redirect('/catalog')
    context.updateNav()
  }
}