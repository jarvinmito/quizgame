<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];
$round = $_POST['currRound'];
$position = $_POST['position'];
$score = $_POST['score'];
$answer = $_POST['answer'];
$status = 'pending';

$sql = "INSERT INTO engage_scoreboard VALUES ($matchid, $round, '$position', '$score', '$answer')";
if(mysqli_query($conn, $sql)){
	// Yes inserted
	$status = 'success';
}

mysqli_close($conn);

$arr = array('status' => $status);
echo json_encode($arr);

?>