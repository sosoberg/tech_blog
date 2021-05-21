

const newPostHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#commentPost').value.trim();
    const post_id = document.querySelector('#postBtn').value.trim();
    
    if (comment && post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        alert('Failed to comment');
      }
    }
  };
  
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('value')) {
      const id = event.target.getAttribute('value');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });

      document.location.replace(`/post/${post_id}`);
      
      } else {
        alert('Failed to delete project');
      }
    
  };
  
  document
    .querySelector('.newCommentForm')
    .addEventListener('submit', newPostHandler);

const deleteBtn = document.querySelectorAll(".delete_recipe")
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', delButtonHandler);
};