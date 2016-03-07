<?php
// CREATING A MATCH
require "init.php";

$matchid = $_GET['matchid'];

$sql = "SELECT * FROM engage_match WHERE match_id=$matchid";
$res = mysqli_query($conn, $sql);
if(mysqli_num_rows($res) != 0){
	$get = mysqli_fetch_array($res);
}

mysqli_close($conn);

$players['a'] = array('name' => $get['match_player_a'], 'badge' => 'Magaling', 'place' => 'a', 'score' => 0);
$players['b'] = array('name' => $get['match_player_b'], 'badge' => 'Magaling', 'place' => 'b', 'score' => 0);

$arr = array('players' => $players);
echo json_encode($arr);

?>