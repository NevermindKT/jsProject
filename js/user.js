
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = { username, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = "index.html";
    });
  }

  const userData = localStorage.getItem("user");
  if (userData && window.location.pathname.includes("user.html")) {
    const user = JSON.parse(userData);
    document.getElementById("profile-username").textContent = user.username;
    document.getElementById("profile-email").textContent = user.email;
  }
});
