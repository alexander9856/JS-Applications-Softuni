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
    <section id="login">
      <div class="container">
        <form @submit=${onLogin} id="login-form" action="#" method="post">
          <h1>Login</h1>
          <p>Please enter your credentials.</p>
          <hr>
    
          <p>Username</p>
          <input placeholder="Enter Username" name="username" type="text">
    
          <p>Password</p>
          <input type="password" placeholder="Enter Password" name="password">
          <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
          <p>Dont have an account?
            <a href="#">Sign up</a>.
          </p>
        </div>
      </div>
    </section>
    `
}

async function onLogin(ev) {
  debugger
  ev.preventDefault()
  let formData = new FormData(ev.target);
  let username = formData.get('username');
  let pass = formData.get('password')
  if (!username || !pass) {
    alert('All fields are required!')
  }
  else {
    await login(username, pass)
    ev.target.reset()
    context.page.redirect('/catalog')
    context.updateNav()
  }
}