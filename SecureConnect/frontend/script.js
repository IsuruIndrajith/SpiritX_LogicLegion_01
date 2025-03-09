document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let message = document.getElementById("message");

    if (username.length < 8) {
        document.getElementById('usernameError').innerText = "Username must be at least 8 characters long.";
        valid = false;
    } else {
        document.getElementById('usernameError').innerText = "";
    }

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').innerText = "Password must contain at least one lowercase, one uppercase, and one special character.";
        valid = false;
    } else {
        document.getElementById('passwordError').innerText = "";
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = "Passwords do not match.";
        valid = false;
    } else {
        document.getElementById('confirmPasswordError').innerText = "";
    }



    fetch("../backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${username}&password=${password}&confirm_password=${confirmPassword}`
    })
    .then(response => response.json())
    .then(data => {
        message.textContent = data.error || data.success;
        if (data.success) setTimeout(() => window.location = "index.html", 2000);
    });
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginMessage");

    if (!username || !password) {
        errorMessage.innerText = "Both fields are required.";
        return;
    }


    fetch("../backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("Success")) {
            window.location.href = "dashboard.html"; // Redirect to dashboard on success
        } else {
            errorMessage.innerText = data; // Show error message
        }
    })
    .catch(error => console.error("Error:", error));
});
