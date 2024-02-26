<?php
$servername_ = "localhost";
$username_ = "root";
$password_ = "";
$dbname_ = "turismo";

// Connection to mysql server
$conn = new mysqli($servername_, $username_, $password_);
mysqli_set_charset($conn, "utf8");

if ($conn->connect_error) die("Connessione fallita: " . $conn->connect_error);

// Check if database exists
try {
  $conn->select_db($dbname_);
  if ($conn->error) throw new mysqli_sql_exception($db->error);
}
catch (mysqli_sql_exception $e) {
  // Database doesn't exist: create it
  $sql = "CREATE DATABASE $dbname_";
  if (!$conn->query($sql))
    die("Connection error");
  $conn->select_db($dbname_);
}
