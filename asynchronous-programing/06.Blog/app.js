function attachEvents() {
    let loadAllPosts = document.getElementById('btnLoadPosts');
    loadAllPosts.addEventListener('click', getAllPosts);
    let btnViewPost = document.getElementById('btnViewPost');
    btnViewPost.addEventListener('click', displayPost);

    let titleElement = document.getElementById('post-title');
    let bodyElement = document.getElementById('post-body');
    let ulElement = document.getElementById('post-comments');
    let selectElement = document.getElementById('posts');

    // await getAllPosts();
    // btnViewPost.click()

    async function getAllPosts() {
        let res = await fetch('http://localhost:3030/jsonstore/blog/posts');
        let data = await res.json();
        selectElement.innerHTML = ``;
        for (let i in data) {
            selectElement.innerHTML += `<option value="${data[i].id}">${data[i].title}</option>`
        }
    }
    async function displayPost() {


        titleElement.textContent = 'Unit Testing And Modules';
        bodyElement.textContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis maiores eligendi quos quidem ex numquam hic. Eos quos similique voluptates accusamus quae voluptas magni ad a ipsum, quia enim debitis cumque quibusdam exercitationem architecto sint nostrum dolorum dolor repudiandae nulla deserunt, dolorem itaque!';

        let selectedId = document.getElementById('posts').value;
        let title = selectElement.options[selectElement.selectedIndex].text


        let response = await fetch(`http://localhost:3030/jsonstore/blog/posts`)
        let posts = await response.json();
        let selectedPost = Object.values(posts).filter((post) => post.title === title)[0]

        let responseAllComments1 = await fetch(`http://localhost:3030/jsonstore/blog/comments/`)
        let commentsAll = await responseAllComments1.json();
        let comments = Object.values(commentsAll).filter((comment) => comment.postId === selectedId)

        // let res = await fetch('http://localhost:3030/jsonstore/blog/posts/' + selectedId); <----------
        // let post = await res.json();

        // let res2 = await fetch('http://localhost:3030/jsonstore/blog/comments');
        // let dataa = await res2.json()
        // let comments = Object.values(dataa).filter(c => c.postId == selectedId);

        titleElement.textContent = selectedPost.title;
        bodyElement.textContent = selectedPost.body;

        ulElement.innerHTML = ``;

        comments.forEach(c => {
            ulElement.innerHTML += `<li>${c.text}</li>`
        });
    }
}

attachEvents();

// async function attachEvents() {
//     let loadAllPostsBtn = document.getElementById('btnLoadPosts');
//     loadAllPostsBtn.addEventListener('click', loadAllPosts);
//     let postsSelect = document.getElementById('posts');
//     let btnViewPost = document.getElementById('btnViewPost');
//     btnViewPost.addEventListener('click', loadPost)
//     let postTitle = document.getElementById('post-title');
//     let postBody = document.getElementById('post-body');
//     await loadAllPosts();
//     btnViewPost.click();

//     async function loadAllPosts(ev) {
//         let response = await fetch(`http://localhost:3030/jsonstore/blog/posts`)
//         let posts = await response.json();
//         drawAllPosts(posts)
//     }

//     async function loadPost(ev) {
//         let postId = postsSelect.value;
//         let title = postsSelect.options[postsSelect.selectedIndex].text
//         let response = await fetch(`http://localhost:3030/jsonstore/blog/posts`)
//         let posts = await response.json();
//         let selectedPost = Object.values(posts).filter((post) => post.title === title)[0]

//         let responseAllComments1 = await fetch(`http://localhost:3030/jsonstore/blog/comments/`)
//         let commentsAll = await responseAllComments1.json();
//         let comments = Object.values(commentsAll).filter((comment) => comment.postId === postId)

//         drawPost(selectedPost, comments)



//     }
//     function drawAllPosts(posts) {
//         postsSelect.innerHTML = '';
//         Object.values(posts).forEach((post) => {
//             let postLi = document.createElement('option');
//             postLi.textContent = post.title;
//             postLi.value = post.id
//             postsSelect.appendChild(postLi)
//         })


//     }
//     function drawPost(selectedPost, comments) {

//         postTitle.textContent = selectedPost.title;
//         postBody.textContent = selectedPost.body;

//         let posCommentsUl = document.getElementById('post-comments');
//         posCommentsUl.innerHTML = ``;
//         comments.forEach(element => {
//             let li = document.createElement('li');
//             li.textContent = element.text;
//             posCommentsUl.appendChild(li);
//         });
//     }
// }

// attachEvents();


