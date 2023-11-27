const postForm = document.getElementById('mindMapForm');
const postTitle = document.getElementById('createPostTitle');
const postContent = document.getElementById('createPostContent');
const homePageRedirect = document.getElementById('submitPost');

homePageRedirect.addEventListener('click', function() {

var postTitleInput = postTitle.value;
var postContentInput = postContent.value;

fetch('/submitPost', {
    method: 'POST',
    body: JSON.stringify({ post_title: postTitleInput, post_content: postContentInput }),
    headers: {
        'Content-Type': 'application/json'
        }
    }).then(function() {document.location.replace('/homepage');
        });
});