
// --- Storage helpers ---
function loadUsers() {
  const saved = localStorage.getItem("shopeasy_users");
  return saved ? JSON.parse(saved) : [];
}

function saveUsers(users) {
  localStorage.setItem("shopeasy_users", JSON.stringify(users));
}

function getCurrentUser() {
  const saved = localStorage.getItem("shopeasy_currentUser");
  return saved ? JSON.parse(saved) : null;
}

function setCurrentUser(user) {
  localStorage.setItem("shopeasy_currentUser", JSON.stringify(user));
}

function logOut() {
  localStorage.removeItem("shopeasy_currentUser");
  window.location.href = "index.html";
}

// --- Navbar auth area (shown on every page that has #authArea) ---
function renderAuthArea() {
  const authArea = document.getElementById("authArea");
  if (!authArea) return;

  const user = getCurrentUser();

  if (user) {
    authArea.innerHTML = `
      <span class="auth-greeting">Hi, ${user.name}</span>
      <button id="logoutBtn" class="auth-link-btn">Logout</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", logOut);
  } else {
    authArea.innerHTML = `
      <a href="login.html" class="auth-link">Login</a>
      <a href="signup.html" class="auth-link">Sign Up</a>
    `;
  }
}

renderAuthArea();

// --- Signup form (only present on signup.html) ---
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const errorEl = document.getElementById("signupError");
    errorEl.textContent = "";

    if (!name || !email || !password) {
      errorEl.textContent = "Please fill in all fields.";
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = "Password must be at least 6 characters.";
      return;
    }

    if (password !== confirmPassword) {
      errorEl.textContent = "Passwords do not match.";
      return;
    }

    const users = loadUsers();
    const alreadyExists = users.some(u => u.email === email);
    if (alreadyExists) {
      errorEl.textContent = "An account with this email already exists.";
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    setCurrentUser({ name, email });
    window.location.href = "index.html";
  });
}

// --- Login form (only present on login.html) ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const errorEl = document.getElementById("loginError");
    errorEl.textContent = "";

    const users = loadUsers();
    const match = users.find(u => u.email === email && u.password === password);

    if (!match) {
      errorEl.textContent = "Invalid email or password.";
      return;
    }

    setCurrentUser({ name: match.name, email: match.email });
    window.location.href = "index.html";
  });
}