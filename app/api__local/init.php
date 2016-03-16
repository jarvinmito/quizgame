<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$hostname = "localhost";
$dbname = "engage";
$dbuser = "root";
$dbpass = "";

// Create connection
$conn = mysqli_connect($hostname, $dbuser, $dbpass, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>