

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-name').value.trim();
    const blogPost = document.querySelector('#blogPost').value.trim();
  
    if (title && blogPost) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, blogPost }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('value')) {
      const id = event.target.getAttribute('value');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      document.location.replace('/profile');
      
      } else {
        alert('Failed to delete project');
      }
    
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);

const deleteBtn = document.querySelectorAll(".delete_recipe")
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', delButtonHandler);
};