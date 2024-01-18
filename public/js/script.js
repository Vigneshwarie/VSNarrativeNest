var loginButton = document.querySelector('.login-form');
var submitPostBtn = document.querySelector('#submitPostBtn');
var signupbtn = document.querySelector('#signupbtn');

var dashdeletebtn = document.querySelectorAll('.dashdeletebtn');
var dashcommentbtn = document.querySelectorAll('.dashcommentbtn');
var commentSection = document.querySelectorAll('.commentSection');
var buttonSection = document.querySelectorAll('.buttonSection');
var submitCommentBtn = document.querySelectorAll('.submitCommentBtn');
var blogCommentElement = document.querySelectorAll('.blogComment');






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
               document.location.replace('/home');
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
               alert("You are logged in!");
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

for (let i = 0; i < dashdeletebtn.length; i++) {
     dashdeletebtn[i].addEventListener("click", async function(event) {
          var itemElement = event.currentTarget.parentElement;
          const targetId = itemElement.getAttribute("id");
          console.log(itemElement);
          console.log(targetId);

          const response = await fetch('/deletepost', {
               method: 'DELETE',
               body: JSON.stringify({targetId }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               alert('Blog id# '+targetId+' deleted successfully');
               document.location.replace('/dashboard');
          } else {
               alert('Delete Failed. Please try again!');
          }
     });
}

for (let i = 0; i < dashcommentbtn.length; i++) {
     dashcommentbtn[i].addEventListener('click', function (event) {
          commentSection[i].classList.value = "showComment";
          buttonSection[i].classList.value = "hideButtons";
     });
}

for (let i = 0; i < submitCommentBtn.length; i++) {
     submitCommentBtn[i].addEventListener('click', async function (event) {
          var itemElement = event.currentTarget.parentElement;
          const blogId = itemElement.getAttribute("blogid");
          console.log('Saving blog Comment');
          console.log(itemElement);
          console.log(blogId);

          var blogComment = blogCommentElement[i].value;
          
          console.log(blogComment);

          const response = await fetch('/comment', {
               method: 'POST',
               body: JSON.stringify({blogId, blogComment }),
               headers: { 'Content-Type': 'application/json' },
          }); 

          if (response.ok) {
               document.location.replace('/dashboard');
          } else {
               alert('Blog Comment saved!');
          }
     });
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



