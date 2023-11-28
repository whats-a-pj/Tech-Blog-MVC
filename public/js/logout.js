const logout = async () => {
    const logout = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (logout.ok) {
        document.location.replace('/login');
    } else {
        alert(logout.statusText);
    }
};

document.querySelector('#log-out').addEventListener('click', logout);