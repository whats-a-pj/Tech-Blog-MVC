const postForm = document.getElementById('postForm');
const postTitle = document.getElementById('createPostTitle');
const postContent = document.getElementById('createPostContent');
const homePageRedirect = document.getElementById('submitPost');

homePageRedirect.addEventListener('click', function() {

var postTitleInput = postTitle.value;
var postContentInput = postContent.value;

fetch('/dashboard', {
    method: 'POST',
    body: JSON.stringify({ post_title: postTitleInput, post_content: postContentInput }),
    headers: {
        'Content-Type': 'application/json'
        }
    }).then(function() {document.location.replace('/homepage');
    console.log(1)
        });
});