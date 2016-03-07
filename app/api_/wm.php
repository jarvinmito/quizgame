<?php
// CREATING A MATCH
require "init.php";

$matchid = $_GET['matchid'];
$isWaiting = true;
$name = $_GET['name'];

$sql = "SELECT * FROM engage_match WHERE match_id=$matchid";
$res = mysqli_query($conn, $sql);
if(mysqli_num_rows($res) != 0){
	// MY ROOM FOUND
	// NOW WHAT?
	$get = mysqli_fetch_array($res);
	$matchid = $get['match_id'];
	if($get['match_player_b'] != ''){
		// START GAME
		$isWaiting = false;
	}
	// WE STILL WAIT...
}

mysqli_close($conn);

$arr = array('matchid' => $matchid, 'isWaiting' => $isWaiting);
echo json_encode($arr);

?>