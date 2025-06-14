
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Login simulated!');
            window.location.href = 'dashboard.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (!email.includes('@')) {
                alert('Invalid email');
                return;
            }
            alert('Registration simulated!');
            window.location.href = 'index.html';
        });
    }
});

function toggleMenu(id) {
    const item = document.getElementById(id);
    item.style.display = item.style.display === 'block' ? 'none' : 'block';
}

function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
}

function fetchUserData() {
    const id = document.getElementById('userId').value;
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(u => u.id === id);
            if (user) {
                document.getElementById('userData').textContent = JSON.stringify(user, null, 2);
            } else {
                document.getElementById('userData').textContent = 'User not found';
            }
        });
}
