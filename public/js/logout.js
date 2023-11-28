const logout = async () => {
    const logout = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (logout.ok) {
        document.location.replace('/');
    } else {
        alert(logout.statusText);
    }
};

document.querySelector('#goHome').addEventListener('click', logout);