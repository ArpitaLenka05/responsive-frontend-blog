
const postForm = document.getElementById('post-form');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts');

document.addEventListener('DOMContentLoaded', () => {
  const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  savedPosts.forEach(post => addPostToDOM(post));
});

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPost = {
    id: Date.now(),
    title: postTitle.value,
    content: postContent.value
  };

  const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  savedPosts.push(newPost);
  localStorage.setItem('blogPosts', JSON.stringify(savedPosts));

  addPostToDOM(newPost);

  postForm.reset();
});

function addPostToDOM(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('col-12', 'col-md-6', 'col-lg-4');
  postDiv.innerHTML = `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.content}</p>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </div>
    </div>
  `;
  postsContainer.appendChild(postDiv);

  const deleteBtn = postDiv.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deletePost(post.id, postDiv);
  });
}

function deletePost(id, postElement) {
  let savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  savedPosts = savedPosts.filter(post => post.id !== id);
  localStorage.setItem('blogPosts', JSON.stringify(savedPosts));
  postsContainer.removeChild(postElement);
}
