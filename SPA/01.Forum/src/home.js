import { showDetails } from './details.js'
let homeSection = document.getElementById('homeView');
homeSection.remove();
let main = document.getElementsByTagName('main')[0];

homeSection.querySelector('.new-topic-border form').addEventListener('submit', onSubmit);



let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
let topicTitle = homeSection.querySelector('.topic-title')

export async function showHome() {
    let posts = await getPosts()
    displayPosts(posts)
    main.replaceChildren(homeSection)
}
function onSubmit(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let title = formData.get('topicName')
    let username = formData.get('username');
    let post = formData.get('postText');
    if (ev.submitter.textContent == 'Post') {
        if (title && username && post) {
            let date = new Date()
            addPost({ title, username, post, date })
            showHome()
        }
    }
    ev.target.reset()
}


async function addPost(body) {
    let headers = getHeader('post', body);
    let res = await fetch(url, headers);
    let data = await res.json();
    return data;
}
async function getPosts() {
    let res = await fetch(url)
    let data = await res.json();
    return data
}
function displayPosts(posts) {
    topicTitle.innerHTML = ''
    for (let i in posts) {
        let container = document.createElement('div')
        container.className = 'post'
        container.innerHTML += `
        <div class="topic-name-wrapper>
                            <div class="topic-name">
                                <a href="#" class="normal" id="${posts[i]._id}">
                                    <h2>${posts[i].title}</h2>
                                </a>
                                <div class="columns">
                                    <div>
                                        <p>Date: <time>${posts[i].date}</time></p>
                                        <div class="nick-name">
                                            <p>Username: <span>${posts[i].username}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                        container.querySelector('a').addEventListener('click',showDetails)
                        topicTitle.appendChild(container)
    }
}
// window.displayPosts = displayPosts


function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
