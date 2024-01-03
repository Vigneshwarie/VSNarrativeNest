var loginButton = document.querySelector('.login-form');
var submitPostBtn = document.querySelector('#submitPostBtn');


const loginFormHandler = async (event) => {
     event.preventDefault();

     const email = document.querySelector('#emailInput').value.trim();
     const password = document.querySelector('#passwordInput').value.trim();
 
     if (email && password) {
          const response = await fetch('/login', {
               method: 'POST',
               body: JSON.stringify({ email, password }),
               headers: { 'Content-Type': 'application/json' },
          });
 
          if (response.ok) {
               document.location.replace('/dashboard');
          } else {
               alert('Failed to log in.');
          } 
     } 
};

const saveBlogPostHandler = (event) => {
     event.preventDefault();
     const blogTitle = document.querySelector('#blogTitle').value;
     const blogPost = document.querySelector('#blogPost').value;

     const newBlogPost = {
          blog_title: blogTitle,
          blog_post: blogPost
     };
     saveBlogPost(newBlogPost);
};

const saveBlogPost = async (newBlogPost) => {
     const response = await fetch('/blog', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBlogPost)
     });

     if (response.ok) {
          document.location.replace('/dashboard');
     } else {
          alert('Error in saving the posts');
     } 
};
     
function displayControl() {
     document.querySelector('#commentLink').classList.value = "hideControl";
     document.querySelector('#commentBox').classList.value = "showControl";
}
     
     



if (loginButton) {
     loginButton.addEventListener('click', loginFormHandler);
}

if (submitPostBtn) {
     submitPostBtn.addEventListener('click', saveBlogPostHandler);
}


