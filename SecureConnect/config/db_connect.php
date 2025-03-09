<?php
$conn = new mysqli("localhost", "root", "", "secureconnect");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
