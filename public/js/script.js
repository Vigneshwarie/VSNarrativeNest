const loginFormHandler = async (event) => {
     event.preventDefault();

     const email = document.querySelector('#emailInput').value.trim();
     const password = document.querySelector('#passwordInput').value.trim();

     console.log(1234566);
     console.log(email);
     console.log(password);

    
     if (email && password) {
          const response = await fetch('/login', {
               method: 'POST',
               body: JSON.stringify({ email, password }),
               headers: { 'Content-Type': 'application/json' },
          });

          console.log(response);
 
          if (response.ok) {
               document.location.replace('/dashboard');
          } else {
               alert('Failed to log in.');
          } 
     } 
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
