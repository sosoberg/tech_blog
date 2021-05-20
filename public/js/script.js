const blogPostBtn = document.querySelectorAll('#blogPostBtn');

for (let i = 0; i < blogPostBtn.length; i++) {
    blogPostBtn[i].addEventListener('click', function(event) {
        event.preventDefault();
        const id = event.currentTarget.getAttribute('value');
        console.log(id)
    
        window.location.replace(`/post/${id}`)
    });
}

