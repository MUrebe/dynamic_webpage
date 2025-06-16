document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Giriş
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            localStorage.setItem('loggedInUser', username || 'User');
            alert('Login simulated!');
            window.location.href = 'dashboard.html';
        });
    }

    // Kayıt
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (!email.includes('@')) {
                alert('Invalid email');
                return;
            }
            localStorage.setItem('registeredEmail', email);
            alert('Registration simulated!');
            window.location.href = 'index.html';
        });
    }

    // Dashboard ayarları
    const welcomeName = document.getElementById('welcomeName');
    const userInfo = document.getElementById('userInfo');
    if (welcomeName) {
        const name = localStorage.getItem('loggedInUser') || 'User';
        welcomeName.textContent = name;

        // Saklanan kullanıcı bilgileri
        const savedEmail = localStorage.getItem('userEmail') || 'Not set';
        const savedName = localStorage.getItem('userFirstName') || name;
        userInfo.textContent = `Name: ${savedName}\nEmail: ${savedEmail}`;
    }

    // Tema ayarlarını uygula
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) document.body.className = `theme-${savedTheme}`;

    // Menü görünürlük ayarları
    const panels = ['infoPanel', 'searchPanel', 'xmlSearchPanel', 'themePanel', 'settingsPanel'];
    panels.forEach(id => {
        const visible = localStorage.getItem(`visible-${id}`);
        if (visible === 'false') document.getElementById(id).style.display = 'none';
    });

    // Ayarlar inputları doldur
    const settingEmail = document.getElementById('settingEmail');
    const settingFirstName = document.getElementById('settingFirstName');
    if (settingEmail && settingFirstName) {
        settingEmail.value = localStorage.getItem('userEmail') || '';
        settingFirstName.value = localStorage.getItem('userFirstName') || '';
    }
});

// Tema değiştirme
function changeTheme(theme) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('selectedTheme', theme);
}

// Menü paneli gizle/göster
function toggleSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const visible = el.style.display !== 'none';
    el.style.display = visible ? 'none' : 'block';
    localStorage.setItem(`visible-${id}`, !visible);
}

// JSON’dan veri çekme
function fetchUserData() {
    const id = document.getElementById('userId').value;
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const user = data.users.find(u => u.id === id);
            document.getElementById('userData').textContent =
                user ? JSON.stringify(user, null, 2) : 'User not found';
        });
}

// XML’den veri çekme
function fetchUserFromXML() {
    const id = document.getElementById('userIdXml').value;
    fetch('data.xml')
        .then(res => res.text())
        .then(str => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, 'application/xml');
            const users = xml.getElementsByTagName('user');
            let found = false;
            for (let user of users) {
                if (user.getElementsByTagName('id')[0].textContent === id) {
                    const fname = user.getElementsByTagName('firstName')[0].textContent;
                    const lname = user.getElementsByTagName('lastName')[0].textContent;
                    const email = user.getElementsByTagName('email')[0].textContent;
                    document.getElementById('xmlUserData').textContent =
                        `Name: ${fname} ${lname}\nEmail: ${email}`;
                    found = true;
                    break;
                }
            }
            if (!found) document.getElementById('xmlUserData').textContent = 'User not found';
        });
}

// Ayarları kaydet
function saveUserSettings() {
    const email = document.getElementById('settingEmail').value;
    const fname = document.getElementById('settingFirstName').value;
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userFirstName', fname);
    document.getElementById('settingsSaved').textContent = 'Settings saved!';
}

// Çıkış
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}
