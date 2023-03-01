import { html, render } from './node_modules/lit-html/lit-html.js';
import { logout } from './src/api/data.js'
import page from '../node_modules/page/page.mjs';

import { homeView } from './src/views/home.js'
import { createView } from './src/views/create.js'
import { detailsView } from './src/views/details.js'
import { editView } from './src/views/edit.js'
import { loginView } from './src/views/login.js'
import { registerView } from './src/views/register.js'
import { searchView } from './src/views/search.js'
import {catalogView} from './src/views/catalogView.js'

let container = document.querySelector('main')


page('/', renderMiddleware, homeView)
page('/register', renderMiddleware, registerView)
page('/login', renderMiddleware, loginView)
page('/catalog', renderMiddleware, catalogView)
page('/create', renderMiddleware, createView)
page('/edit/:id', renderMiddleware, editView)
page('/details/:id', renderMiddleware, detailsView)
page('/search*', renderMiddleware, searchView)
page("*", renderMiddleware, homeView)
page.start()
updateNav()





document.getElementById('logoutBtn').addEventListener('click', onLogout);
async function onLogout() {
    await logout()
    debugger
    updateNav()
    page.redirect('/')

}
function updateNav() {
    debugger
    let user = sessionStorage.getItem('user');
    if (user) {
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user').style.display = 'inline-block';
    }
    else {
        document.querySelector('.guest').style.display = 'inline-block';
        document.querySelector('.user').style.display = 'none';
    }
}


function renderMiddleware(ctx, next) {
    debugger
    ctx.render = (content) => render(content, container);
    ctx.updateNav = updateNav
    next()
}