// Object to store login credentials
const loginCredentials = {
  "Islem Ben Alaya": "nesglobe",
  "Francois Picard": "nesglobe"
};

// Function to perform login authentication
function authenticate(username, password) {
  // Check if the username exists and the password is correct
  return loginCredentials[username] === password;
}

// Function to handle login form submission
function handleLogin(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!usernameInput || !passwordInput) {
    console.error("Username or password input elements not found.");
    return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if the username exists in loginCredentials
  if (!(username in loginCredentials)) {
    const loginError = document.getElementById("login-error");
    if (loginError) {
      loginError.textContent = "Username not found";
    }
    return;
  }

  // Check if the password is correct
  if (authenticate(username, password)) {
    // Authentication successful
    localStorage.setItem("username", username);
    checkUserLoggedIn();
  } else {
    // Authentication failed due to incorrect password
    const loginError = document.getElementById("login-error");
    if (loginError) {
      loginError.textContent = "Incorrect password";
    }
  }
}

// Function to handle user disconnection
function disconnect() {
  // Clear the stored username
  localStorage.removeItem("username");

  // Refresh the page to show the login interface
  window.location.reload();
}

// Function to check if the user is already logged in and display the content container accordingly
function checkUserLoggedIn() {
  const username = localStorage.getItem("username");
  const loginContainer = document.getElementById("login-container");
  const contentContainer = document.getElementById("content-container");
  const headerUserinfo = document.getElementById("header-userinfo");

  if (username) {
    // If the user is logged in, show the content container and hide the login container.
    if (loginContainer && contentContainer && headerUserinfo) {
      loginContainer.style.display = "none";
      contentContainer.style.display = "block";

      // Update the header to display the logged-in user's username
      const headerUsername = document.getElementById("header-username");
      if (headerUsername) {
        headerUsername.textContent = `Welcome, ${username}`;
      }
      headerUserinfo.style.display = "flex";
    }
  } else {
    // If the user is not logged in, show the login container and hide the content container.
    if (loginContainer && contentContainer && headerUserinfo) {
      loginContainer.style.display = "block";
      contentContainer.style.display = "none";
      headerUserinfo.style.display = "none";
    }
  }
}

// Attach the login form submission event listener
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}

// Check if the user is already logged in on page load
document.addEventListener("DOMContentLoaded", function () {
  checkUserLoggedIn();
});

// Disconnect the first user on initial page load if they are already logged in
const firstUser = localStorage.getItem("username");
if (firstUser) {
  disconnect();
}
