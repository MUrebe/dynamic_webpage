document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Giriş işlemi
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users') || '{}');

            if (users[username] && users[username].password === password) {
                alert(`Welcome, ${users[username].firstName}!`);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Kayıt işlemi
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !email || !firstName || !lastName || !password) {
                alert('Please fill in all fields.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Invalid email format.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '{}');

            if (users[username]) {
                alert('Username already exists.');
                return;
            }

            for (const key in users) {
                if (users[key].email === email) {
                    alert('Email already registered.');
                    return;
                }
            }

            users[username] = {
                email,
                firstName,
                lastName,
                password
            };

            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            window.location.href = 'index.html';
        });
    }
});

// Tema değiştirme
function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
}

// Menü öğesi aç/kapa
function toggleMenu(id) {
    const item = document.getElementById(id);
    item.style.display = item.style.display === 'block' ? 'none' : 'block';
}

// ID numarası ile JSON'dan veri çekme
function fetchUserData() {
    const id = document.getElementById('userId').value;
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(u => u.id === id);
            const output = document.getElementById('userData');
            if (user) {
                output.textContent = JSON.stringify(user, null, 2);
            } else {
                output.textContent = 'User not found';
            }
        });
}
