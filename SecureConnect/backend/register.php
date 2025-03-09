<?php
session_start();
require "../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    if (strlen($username) < 8) {
        die(json_encode(["error" => "Username must be at least 8 characters."]));
    }

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/', $password)) {
        die(json_encode(["error" => "Password must have uppercase, lowercase, and special char."]));
    }

    if ($password !== $confirm_password) {
        die(json_encode(["error" => "Passwords do not match."]));
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        die(json_encode(["error" => "Username taken."]));
    }

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashed_password);
    
    echo $stmt->execute() ? json_encode(["success" => "Signup successful! Redirecting..."]) : json_encode(["error" => "Registration failed."]);
}
?>
