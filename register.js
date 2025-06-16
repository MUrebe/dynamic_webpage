document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const password = document.getElementById("password").value;

    // Basit doğrulama
    if (!username || !email || !firstName || !lastName || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // E-posta geçerli mi?
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // LocalStorage'dan kullanıcıları al
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    // Benzersiz kullanıcı kontrolü
    if (users[username]) {
      alert("Username already exists. Please choose another.");
      return;
    }

    // E-posta benzersiz mi?
    for (const key in users) {
      if (users[key].email === email) {
        alert("Email already registered.");
        return;
      }
    }

    // Yeni kullanıcıyı kaydet
    users[username] = {
      email,
      firstName,
      lastName,
      password
    };

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "index.html"; // login sayfasına yönlendir
  });
});
