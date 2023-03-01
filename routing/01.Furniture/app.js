import page from'./node_modules/page/page.mjs';
import { logout } from './src/api/data.js'
import { html, render } from './node_modules/lit-html/lit-html.js';
import { catalogView } from './src/views/catalog.js';
import { createView } from './src/views/create.js';
import { detailsView } from './src/views/details.js';
import { editView } from './src/views/edit.js';
import { loginView } from './src/views/login.js';
import { furnitureView } from './src/views/myFurniture.js';
import { registerView } from './src/views/register.js'

let container = document.querySelector('.container')


page('/', renderMiddleware, catalogView)
page('/register', renderMiddleware, registerView)
page('/login', renderMiddleware, loginView)
page('/catalog', renderMiddleware, catalogView)
page('/create', renderMiddleware, createView)
page('/edit/:id', renderMiddleware, editView)
page('/details/:id', renderMiddleware, detailsView)
page('/my-furniture', renderMiddleware, furnitureView)
page("*", renderMiddleware, catalogView)
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
    let user = sessionStorage.getItem('user');
    if (user) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
    }
    else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}


function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.updateNav = updateNav
    next()
}