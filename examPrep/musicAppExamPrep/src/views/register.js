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
      <form @submit=${onRegister}>
        <fieldset>
          <legend>Register</legend>
    
          <label for="email" class="vhide">Email</label>
          <input id="email" class="email" name="email" type="text" placeholder="Email">
    
          <label for="password" class="vhide">Password</label>
          <input id="password" class="password" name="password" type="password" placeholder="Password">
    
          <label for="conf-pass" class="vhide">Confirm Password:</label>
          <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
          <button type="submit" class="register">Register</button>
    
          <p class="field">
            <span>If you already have profile click <a href="#">here</a></span>
          </p>
        </fieldset>
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
  let rePass = formData.get('conf-pass');
  if (!email || !pass || !rePass) {
    alert('All fields are required!')
  }
  else if (pass !== rePass) {
    alert('Passwords don\'t match!')
  }
  else {
    await register(email, pass)
    ev.target.reset()
    context.page.redirect('/')
    context.updateNav()
  }
}