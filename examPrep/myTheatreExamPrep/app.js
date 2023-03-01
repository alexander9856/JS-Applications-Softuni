import { html, render } from './node_modules/lit-html/lit-html.js';
import { logout } from './src/api/data.js'
import page from '../node_modules/page/page.mjs';
import { homeView } from './src/views/home.js'
import { createView } from './src/views/create.js'
import { detailsView } from './src/views/details.js'
import { editView } from './src/views/edit.js'
import { loginView } from './src/views/login.js'
import { registerView } from './src/views/register.js'
import { catalogView } from './src/views/catalogView.js'
import { myPostsView } from './src/views/myposts.js';

let container = document.getElementById('content')


page('/', renderMiddleware, homeView)
page('/home', renderMiddleware, homeView)
page('/register', renderMiddleware, registerView)
page('/login', renderMiddleware, loginView)
page('/dashboard', renderMiddleware, catalogView)
page('/create', renderMiddleware, createView)
page('/edit/:id', renderMiddleware, editView)
page('/details/:id', renderMiddleware, detailsView)
page('/profile', renderMiddleware, myPostsView)

page("*", renderMiddleware, homeView)
page.start()
updateNav()





document.getElementById('logoutBtn').addEventListener('click', onLogout);
async function onLogout() {
    debugger
    await logout()
    updateNav()
    page.redirect('/home')

}
function updateNav() {
    debugger
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        [...document.getElementsByClassName('user')].forEach(el => el.style.display = 'inline-block');
        [...document.getElementsByClassName('guest')].forEach(el => el.style.display = 'none');
    }
    else {
        [...document.getElementsByClassName('user')].forEach(el => el.style.display = 'none');
        [...document.getElementsByClassName('guest')].forEach(el => el.style.display = 'inline-block');
    }
}


function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.updateNav = updateNav
    next()
}