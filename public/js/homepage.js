const savedPost = document.getElementsByClassName('saved');


for (var i = 0; i < savedPost.length; i++) {
    savedPost[i].addEventListener('click', function() {
        fetch('/showSaved', {
            method: 'POST',
            body: JSON.stringify({ id: this.id }),
            headers: {
                'Content-Type': 'application/json'
                }
            })
    })
}