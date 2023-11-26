const loginHandler = async (event) => {
    event.preventDefault();

const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // console.log(username, password)
if (username && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });
if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
        
    }}
};

// Get references to the "Sign Up" link and the sign-up form
const signUpLink = document.getElementById('signup-link');
const signUpForm = document.getElementById('signUpForm');

// A click event listener for the "sign Up" link
signUpLink.addEventListener('click', async (event) => {
    event.preventDefault(); 

    // Toggle the visibility of the sign-up form
    signUpForm.classList.toggle('hidden');


    const scrollPosition = window.innerHeight;

    // Smoothly scroll to the sign-up form
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
});

const signupHandler = async (event) => {
    event.preventDefault();

// const name = document.querySelector('#signup-name').value.trim();
const username = document.querySelector('#signupUsername').value.trim();
const password = document.querySelector('#signupPassword').value.trim();
if (username && password) {
    const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    }
};

const logout = async () => {
    const logout = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (logout.ok) {
        document.location.replace('/');
    } else {
        alert(logout.statusText);
    }
};

document.querySelector('#loginBtn').addEventListener('click', loginHandler);
document.querySelector('#signUpForm').addEventListener('click', signupHandler);
document.querySelector('#logout').addEventListener('click', logout);