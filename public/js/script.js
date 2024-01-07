var loginButton = document.querySelector('.login-form');
var submitPostBtn = document.querySelector('#submitPostBtn');
var signupbtn = document.querySelector('#signupbtn');

// Function to Login into the application
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

// Function to get the Blog data and call the Save method
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

// Function to save the Blog Post
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


// Function to SignUp into the application
const signUpFormHandler = async (event) => {
     event.preventDefault();

     const firstName = document.querySelector('#firstnamesignup').value.trim();
     const lastName = document.querySelector('#lastnamesignup').value.trim();
     const username = document.querySelector('#emailsignup').value.trim();
     const password = document.querySelector('#passwordsignup').value.trim();
     const confirmpassword = document.querySelector('#confirmpasswordsignup').value.trim();

     if (firstName && lastName && username && comparePassword(password, confirmpassword)) {
          const response = await fetch('/signup', {
               method: 'POST',
               body: JSON.stringify({ firstName, lastName, username, password }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.replace('/dashboard');
          } else {
               alert('Sign Up process failed. Please try again!');
          }
     }
};
     
function comparePassword(password, confirmpassword) {
     if (password === confirmpassword) {
          return true;
     } else {
          alert('Entered Password and Confirm Password does not match!');
          return false;
     }
}
     
     



if (loginButton) {
     loginButton.addEventListener('click', loginFormHandler);
}

if (submitPostBtn) {
     submitPostBtn.addEventListener('click', saveBlogPostHandler);
}

if (signupbtn) {
     signupbtn.addEventListener('click', signUpFormHandler);
}


