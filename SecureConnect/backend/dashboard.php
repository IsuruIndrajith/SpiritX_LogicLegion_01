<?php
session_start();
if (!isset($_SESSION["username"])) {
    header("Location: ../frontend/index.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" href="../frontend/styles.css">
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION["username"]); ?>!</h1>
    <a href="../backend/logout.php">Logout</a>
</body>
</html>
