let commentSection = document.getElementById('commentView');
commentSection.remove()
let main = document.getElementsByTagName('main')[0];
let url = 'http://localhost:3030/jsonstore/collections/myboard/posts/'
export async function showDetails(ev) {
    let id;
    if (ev.target.tagName == 'H2') {
        id = ev.target.parentElement.id
    }
    else {
        id = ev.target.id
    }
    let post = await loadPost(id);
    let comment = `
    <div class="theme-content">
                    <div class="theme-title">
                        <div class="theme-name-wrapper">
                            <div class="theme-name">
                                <h2>${post.title}</h2>
        
                            </div>
        
                        </div>
                    </div>
                    <div class="comment">
                        <div class="header">
                            <img src="./static/profile.png" alt="avatar">
                            <p><span>${post.username}</span> posted on <time>${post.date}</time></p>
                    
                            <p class="post-content">${post.post}</p>
                        </div>
                        <div id="user-comment">
                    
                    
                    </div>
    `
    commentSection.innerHTML = comment
    commentSection.innerHTML += `<div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
</div>`
    let answerForm = commentSection.querySelector('.answer-comment');
    answerForm.querySelector('.answer form').addEventListener('submit', answer)
    main.replaceChildren(commentSection)
}

function answer(ev) {
    ev.preventDefault()
    let formData = new FormData(ev.target);
    let content = formData.get('postText');
    let username = formData.get('username');
    let date = new Date()
    if (content && username) {
        document.getElementById('user-comment').innerHTML += `
        <div class="topic-name-wrapper">
                                    <div class="topic-name">
                                        <p><strong>${username}</strong> commented on <time>${date}</time></p>
                                        <div class="post-content">
                                            <p>${content}</p>
                                        </div>
                                    </div>
                                </div>`
        ev.target.reset()

    }



}
async function loadPost(id) {
    let res = await fetch(url + id);
    let data = await res.json()
    return data
}