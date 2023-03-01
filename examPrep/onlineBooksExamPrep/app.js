import { html, render } from './node_modules/lit-html/lit-html.js';
import { logout } from './src/api/data.js'
import page from '../node_modules/page/page.mjs';
import { homeView } from './src/views/home.js'
import { createView } from './src/views/create.js'
import { detailsView } from './src/views/details.js'
import { editView } from './src/views/edit.js'
import { loginView } from './src/views/login.js'
import { registerView } from './src/views/register.js'
import {catalogView} from './src/views/catalogView.js'
import { myPostsView } from './src/views/myposts.js';

let container = document.getElementById('site-content')


page('/', renderMiddleware, catalogView)
page('/register', renderMiddleware, registerView)
page('/login', renderMiddleware, loginView)
page('/dashboard', renderMiddleware, catalogView)
page('/create', renderMiddleware, createView)
page('/edit/:id', renderMiddleware, editView)
page('/details/:id', renderMiddleware, detailsView)
page('/myposts', renderMiddleware, myPostsView)

page("*", renderMiddleware, homeView)
page.start()
updateNav()





document.getElementById('logoutBtn').addEventListener('click', onLogout);
async function onLogout() {
    debugger
    await logout()
    updateNav()
    page.redirect('/dashboard')

}
function updateNav() {
    debugger
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.getElementById('user').firstElementChild.textContent = `Welcome, ${user.email}`
        document.getElementById('user').firstElementChild.style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user').style.display = 'inline-block';
    }
    else {
        document.getElementById('user').firstElementChild.style.display = 'none'
        document.querySelector('#guest').style.display = 'inline-block';
        document.querySelector('#user').style.display = 'none';
    }
}


function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.updateNav = updateNav
    next()
}