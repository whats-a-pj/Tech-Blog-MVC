const goHome = document.getElementById('');
const goDashboard = document.getElementById('');
const goLogin = document.getElementById('');

goHome.addEventListener('click', function() {
    document.location.replace('/homepage');
});

goDashboard.addEventListener('click', function() {
    document.location.replace('/dashboard');
});

goLogin.addEventListener('click', function() {
    document.location.replace('/login')
});