import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from '../api/data.js';
let context = null;

export function loginView(ctx) {
  context = ctx
  console.log('loginView')
  ctx.render(createRegisterTemp())
}
function createRegisterTemp() {
  return html`
    <section id="loginPage">
      <form @submit=${onLogin}>
        <fieldset>
          <legend>Login</legend>
    
          <label for="email" class="vhide">Email</label>
          <input id="email" class="email" name="email" type="text" placeholder="Email">
    
          <label for="password" class="vhide">Password</label>
          <input id="password" class="password" name="password" type="password" placeholder="Password">
    
          <button type="submit" class="login">Login</button>
    
          <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
          </p>
        </fieldset>
      </form>
    </section>
    `
}

async function onLogin(ev) {
  debugger
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