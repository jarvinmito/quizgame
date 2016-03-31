<?php
// CHECK UPDATES ON MATCH
// Checks the status of the match if the other player has accepted / rejected the challenge
require "init.php";

$matchid = $_POST['matchid'];
$playername = $_POST['name'];

$sql = "SELECT * FROM engage_match WHERE match_id=$matchid AND match_player_a='$playername'";
$res = mysqli_query($conn, $sql);

if(mysqli_num_rows($res) == 1){
	$row = mysqli_fetch_array($res);
	$result = array('matchid' => $row['match_id'], 'status' => $row['match_status']);
}else{
	$result = array('error' => 'No Record Found!');
}

mysqli_close($conn);

// $arr = array('score' => $score);
echo json_encode($result);

?>