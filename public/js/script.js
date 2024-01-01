var loginButton = document.querySelector('.login-form');


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




loginButton.addEventListener('click', loginFormHandler);

