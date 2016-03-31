<?php
// CREATING A MATCH
require "init.php";

$matchid = 0;
$isWaiting = true;
$name = $_GET['name'];

$sql = "INSERT INTO engage_match VALUES ('','$name','','waiting')";
if(mysqli_query($conn, $sql)){
	// ROOM CREATED
	// NOW WHAT?
	$matchid = mysqli_insert_id($conn);
	// WE WAIT...
}

mysqli_close($conn);

$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);

?>