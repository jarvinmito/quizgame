<?php
// CREATING A MATCH
require "init.php";

$matchid = $_POST['matchid'];

$sql = "SELECT * FROM engage_match WHERE match_id=$matchid";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) != 0){
	$get = mysqli_fetch_array($result);
	$statuses = array("a" => $get['match_player_a_isactive'], "b" => $get['match_player_b_isactive']);
	$match_details = array("id" => $get['match_id'], "status" => $get['match_status'], "isactive" => $statuses);
}

mysqli_close($conn);

$arr = array('match' => $match_details, 'rematch' => false);
echo json_encode($arr);

?>